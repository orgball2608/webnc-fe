import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

export const URL_SIGNIN = 'signin'
export const URL_SIGNUP = 'signup'
export const URL_SIGNOUT = 'signout'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(URL_SIGNUP, body)
  },
  login: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(URL_SIGNIN, body)
  },
  logout: () => {
    return http.post<AuthResponse>(URL_SIGNOUT)
  }
}

export default authApi
