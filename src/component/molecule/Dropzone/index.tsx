import {isEmpty, isNull} from "lodash";
import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {CloudUploadIcon} from "../../atom/IconButton";

const isDragEvent = (value: any): value is DragEvent => {
    return !!value.dataTransfer
}

const isInput = (value: EventTarget | null): value is HTMLInputElement => {
    return !isNull(value)
}

/**
 * 이벤트로부터 입력된 파일을 받아온다
 * @param e DragEvent | ChangeEvent
 * @returns File의 배열
 */
const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
    if (isDragEvent(e)) {
        return Array.from(e.dataTransfer?.files || [])
    }

    if (isInput(e.target)) {
        return Array.from(e.target.files || [])
    }

    return []
}

type FileType =
    | 'image/png'
    | 'image/jpeg'
    | 'image/jpg'
    | 'image/gif'
    | 'video/mp4'
    | 'video/quicktime'
    | 'application/pdf'

interface DropzoneProps {
    value?: File[]
    name?: string
    acceptedFileTypes?: FileType[]
    width?: number | string
    height?: number | string
    hasError?: boolean
    onDrop?: (files: File[]) => void
    onChange?: (files: File[]) => void
}

type DropzoneRootProps = {
    isFocused?: boolean
    hasError?: boolean
    width: number | string
    height: number | string
}

const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px dashed ${({theme, isFocused, hasError}) => {
    if (hasError) {
      return theme.color.danger
    } else if (isFocused) {
      return theme.color.black
    } else {
      return theme.color.border
    }
  }}
  border-radius: 8px;
  cursor: pointer;
  width: ${({width}) => (typeof width === 'number') ? `${width}px` : width};
  height: ${({height}) => (typeof height === 'number') ? `${height}px` : height};
`

const DropzoneContent = styled.div<{ width: string | number, height: string | number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({width}) => (typeof width === 'number') ? `${width}px` : width};
  height: ${({height}) => (typeof height === 'number') ? `${height}px` : height};
`

const DropzoneInputFile = styled.input`
  display: none;
`

const Dropzone = (props: DropzoneProps) => {
    const {
        onDrop,
        onChange,
        value = [],
        name,
        acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
        width = '100%',
        height = '200px',
        hasError
    } = props
    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false)
        const files = value.concat(
            getFilesFromEvent(e).filter((f) => acceptedFileTypes.includes(f.type as FileType))
        )
        onDrop?.(files)
        onChange?.(files)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFocused(false)
        const files = value.concat(
            getFilesFromEvent(e).filter((f) => acceptedFileTypes.includes(f.type as FileType))
        )
        if (isEmpty(files)) {
            return window.alert(`다음 파일 포맷은 지정할 수 없습니다: ${acceptedFileTypes.join()}`)
        }
        onDrop?.(files)
        onChange?.(files)
    }

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFocused(false)
    }, [])

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFocused(true)
    }, [])

    const handleClick = () => {
        inputRef.current?.click()
    }

    useEffect(() => {
        if (inputRef.current && value && isEmpty(value)) {
            inputRef.current.value = ''
        }
    }, [value])

    return (
        <>
            <DropzoneRoot
                ref={rootRef}
                isFocused={isFocused}
                hasError={hasError}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragEnter}
                onClick={handleClick}
                height={height}
                width={width}>
                <DropzoneInputFile
                    ref={inputRef}
                    type="file"
                    name={name}
                    onChange={handleChange}
                    multiple
                    accept={acceptedFileTypes.join(',')}
                />
                <DropzoneContent height={height} width={width}>
                    <CloudUploadIcon size={24}/>
                    <span style={{textAlign: 'center'}}>기기에서 업로드</span>
                </DropzoneContent>
            </DropzoneRoot>
        </>
    )
}
