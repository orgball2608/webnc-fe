import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type SignupResponse = ResponseApi<{
  token: string
}>

export type SigninResponse = ResponseApi<{
  accessToken: string
  refreshToken: string
}>

export type RefreshTokenResponse = ResponseApi<{
  accessToken: string
}>

export type GetMeResponse = User

export type AuthQueryConfig = {
  access_token?: string
  refresh_token?: string
}
