import { SigninResponse, SignupResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_SIGNIN = 'auth/login'
export const URL_SIGNUP = 'auth/register'
export const URL_SIGNOUT = 'auth/logout'

export type SignupBodyRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  address: string
}

const authApi = {
  signup: (body: SignupBodyRequest) => {
    return http.post<SignupResponse>(URL_SIGNUP, body)
  },
  signin: (body: { email: string; password: string }) => {
    return http.post<SigninResponse>(URL_SIGNIN, body)
  }
}

export default authApi
