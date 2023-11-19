import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UpdateProfileSchema, ChangePasswordSchema } from 'src/utils/rules'

const URL_GETPROFILE = 'users/'
const URL_UPDATEPROFILE = 'users/me'
const URL_UPLOADAVATAR = 'users/me/avatar'
const URL_CHANGEPASSWORD = 'users/change-password'

// export type UpdateProfileRequest = UpdateProfileSchema
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
