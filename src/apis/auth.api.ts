import { GetMeResponse, RefreshTokenResponse, SigninResponse, SignupResponse } from 'src/types/auth.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { LoginSchema, RegisterSchema } from 'src/utils/rules'

const PREFIX = 'auth/'
export const URL_SIGNIN = PREFIX + 'login'
export const URL_SIGNUP = PREFIX + 'register'
export const URL_SIGNOUT = PREFIX + 'logout'
export const URL_GETME = PREFIX + 'me'
export const URL_REFRESH_TOKEN = PREFIX + 'refresh'

export type SignupBodyRequest = Omit<RegisterSchema, 'confirmPassword'>
export type SigninBodyRequest = LoginSchema

const authApi = {
  signup: (body: SignupBodyRequest) => {
    return http.post<SignupResponse>(URL_SIGNUP, body)
  },
  signin: (body: SigninBodyRequest) => {
    return http.post<SigninResponse>(URL_SIGNIN, body)
  },
  signout: () => {
    console.log('signout')

    return http.delete<ResponseApi<null>>(URL_SIGNOUT)
  },
  getMe: () => {
    return http.get<GetMeResponse>(URL_GETME)
  },
  refreshToken: (refreshToken: string) => {
    return http.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
      refreshToken
    })
  },
  forgotPassword: (body: { email: string }) => {
    return http.post<ResponseApi<null>>(PREFIX + 'forgot-password', body)
  },
  resetPassword: (body: { token: string; password: string }) => {
    return http.post<ResponseApi<null>>(PREFIX + 'reset-password', body)
  }
}

export default authApi
