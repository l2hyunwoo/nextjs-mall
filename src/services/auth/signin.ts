import { ApiContext, User } from '../../types/data'
import { fetcher } from '../../utils'

export type SignInParams = {
  /**
   * 사용자명
   * 샘플 사용자의 사용자명은 "user"
   */
  userName: string
  /**
   * 비밀번호
   * 샘플 사용자의 비밀번호는 "password"
   */
  password: string
}

/**
 * 인증 API(로그인)
 */
const signIn = async (
  context: ApiContext,
  params: SignInParams,
): Promise<User> => {
  return await fetcher(`${context.apiRootUrl.replace(/\$/g, '')}/auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export default signIn
