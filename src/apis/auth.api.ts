import { SigninResponse, SignupResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
import { LoginSchema, RegisterSchema } from 'src/utils/rules'

export const URL_SIGNIN = 'auth/login'
export const URL_SIGNUP = 'auth/register'
export const URL_SIGNOUT = 'auth/logout'

export type SignupBodyRequest = Omit<RegisterSchema, 'confirmPassword'>
export type SigninBodyRequest = LoginSchema

const authApi = {
  signup: (body: SignupBodyRequest) => {
    return http.post<SignupResponse>(URL_SIGNUP, body)
  },
  signin: (body: SigninBodyRequest) => {
    return http.post<SigninResponse>(URL_SIGNIN, body)
  }
}

export default authApi
