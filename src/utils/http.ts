import axios, { HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { URL_GETME, URL_SIGNIN, URL_SIGNOUT, URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { GetMeResponse, SigninResponse } from 'src/types/auth.type'
import { toast } from 'react-toastify'
import { isAxiosUnauthorized } from './utils'
import { ErrorResponseApi } from 'src/types/utils.type'

function createHttpInstance() {
  let accessToken = getAccessTokenFromLS()
  let refreshToken = getRefreshTokenFromLS()
  let profile = getProfileFromLS()

  const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Add a request interceptor
  http.interceptors.request.use(
    function (config) {
      if (accessToken && config.headers) {
        config.headers.Authorization = 'Bearer ' + accessToken
      }
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  http.interceptors.response.use(
    function (response) {
      const url = response.config.url

      if (url === URL_SIGNIN) {
        const data = response.data as SigninResponse
        accessToken = data.data?.accessToken
        refreshToken = data.data?.refreshToken
        setAccessTokenToLS(accessToken)
        setRefreshTokenToLS(refreshToken)
      } else if (url === URL_GETME) {
        profile = response.data as GetMeResponse
        setProfileToLS(profile)
      } else if (url === URL_SIGNOUT) {
        accessToken = ''
        refreshToken = ''
        profile = null
        clearLS()
      }
      return response
    },
    function (error) {
      // Chỉ toast lỗi không phải 422 và 401
      console.log(error.response)

      if (
        error.response?.status &&
        ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data?.message || error.message
        toast.error(message)
      }

      if (!isAxiosUnauthorized<ErrorResponseApi<{ name: string; message: string }>>(error)) {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        const { url } = config

        // if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
        //   refreshTokenRequest = refreshTokenRequest
        //     ? refreshTokenRequest
        //     : handleRefreshToken().finally(() => {
        //         setTimeout(() => {
        //           refreshTokenRequest = null
        //         }, 10000)
        //       })

        //   await refreshTokenRequest
        //   return await http(config)
        // }
        // clearLS()
        // accessToken = ''
        // refreshToken = ''
        // profile = null
        // toast.error(error.response?.data.data?.message || error.response?.data.message)
      }

      return Promise.reject(error)
    }
  )

  return http
}

const http = createHttpInstance()
export default http
