import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UpdateProfileSchema } from 'src/utils/rules'

const URL_GETPROFILE = 'users/'
const URL_UPDATEPROFILE = 'users/me'
const URL_UPLOADAVATAR = 'users/me/avatar'

export type UpdateProfileRequest = UpdateProfileSchema

const userApi = {
  getProfile: (userId: string) => {
    return http.get<User>(URL_GETPROFILE + userId)
  },

  getABC: () => {
    return http.get<ResponseApi<User>>(URL_GETPROFILE + '2')
  },

  updateProfile: (body: UpdateProfileRequest) => {
    return http.patch<ResponseApi<null>>(URL_UPDATEPROFILE, body)
  },

  uploadAvatar: (body: FormData) => {
    return http.patch<ResponseApi<string>>(URL_UPLOADAVATAR, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
