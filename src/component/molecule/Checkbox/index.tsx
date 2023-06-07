import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {isEmpty, isNil} from "lodash";
import Flex from "../../layout/Flex";
import {CheckBoxIcon, CheckBoxOutlineBlankIcon} from "../../atom/IconButton";
import Text from "../../atom/Text";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
    label?: string
}

const CheckboxElement = styled.input`
  display: none;
`

const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`

const Checkbox = ({id, label, onChange, checked, ...rest}: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked)
    const ref = useRef<HTMLInputElement>(null)
    const onClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            ref.current?.click()
            setIsChecked((isChecked) => !isChecked)
        },
        [setIsChecked]
    )

    useEffect(() => {
        setIsChecked(checked ?? false)
    }, [checked])

    return (
        <>
            <CheckboxElement
                {...rest}
                ref={ref}
                type={"checkbox"}
                checked={isChecked}
                readOnly={isNil(onChange)}
                onChange={onChange}
            />
            <Flex alignItems={"center"}>
                {checked ?? isChecked ? (
                    <CheckBoxIcon size={20} onClick={onClick}/>
                ) : (
                    <CheckBoxOutlineBlankIcon size={20} onClick={onClick}/>
                )}
            </Flex>
            {!isEmpty(label) && (
                <Label htmlFor={id} onClick={onClick}>
                    <Text>{label}</Text>
                </Label>
            )}
        </>
    )
}

export default Checkbox
