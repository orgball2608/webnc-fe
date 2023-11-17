import { ResponseApi } from './utils.type'

export type SignupResponse = ResponseApi<{
  access_token: string
  refresh_token: string
}>

export type SigninResponse = ResponseApi<null>
