export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<any> => {
  const response = await fetch(resource, init)

  if (!response.ok) {
    const errorRes = await response.json()
    throw new Error(errorRes?.message ?? 'API 요청 중에 에러가 발생했습니다.')
  }

  return response.json()
}
