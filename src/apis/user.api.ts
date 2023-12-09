import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UpdateProfileSchema, ChangePasswordSchema } from 'src/utils/rules'

const PREFIX = 'users/'
const URL_GETPROFILE = PREFIX + ''
const URL_UPDATEPROFILE = PREFIX + 'me'
const URL_UPLOADAVATAR = PREFIX + 'me/avatar'
const URL_CHANGEPASSWORD = PREFIX + 'change-password'

export type UpdateProfileRequest = UpdateProfileSchema
export type ChangePasswordRequest = ChangePasswordSchema

const userApi = {
  getProfile: (userId: string) => {
    return http.get<User>(URL_GETPROFILE + userId)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProfile: (body: any) => {
    return http.patch<ResponseApi<User>>(URL_UPDATEPROFILE, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  uploadAvatar: (body: FormData) => {
    return http.patch<ResponseApi<string>>(URL_UPLOADAVATAR, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  changePassword: (body: ChangePasswordRequest) => {
    return http.patch<ResponseApi<null>>(URL_CHANGEPASSWORD, body)
  }
}

export default userApi
