import { ResponseApi } from './utils.type'

export type SignupResponse = ResponseApi<{
  token: string
}>

export type SigninResponse = ResponseApi<{
  accessToken: string
  refreshToken: string
}>
