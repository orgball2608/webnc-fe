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
import authApi, { URL_GETME, URL_SIGNIN, URL_SIGNOUT, URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { GetMeResponse, SigninResponse } from 'src/types/auth.type'
import { toast } from 'react-toastify'
import { isAxiosExpiredTokenError, isAxiosUnauthorized } from './utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import store from 'src/app/store'
import { signout } from 'src/slices/auth.slice'
import nProgress from 'nprogress'
nProgress.configure({ showSpinner: false })

function createHttpInstance() {
  let accessToken = getAccessTokenFromLS()
  let refreshToken = getRefreshTokenFromLS()
  let profile = getProfileFromLS()
  let refreshTokenRequest: Promise<void> | null = null

  const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Add a request interceptor
  http.interceptors.request.use(
    function (config) {
      nProgress.start()

      const urlSearchParams = new URLSearchParams(window.location.search)
      const urlQueryParams = Object.fromEntries([...urlSearchParams])

      if (config.headers) {
        if (accessToken) {
          config.headers.Authorization = 'Bearer ' + accessToken
        } else if (urlQueryParams.access_token) {
          accessToken = urlQueryParams.access_token
          refreshToken = urlQueryParams.refresh_token
          config.headers.Authorization = 'Bearer ' + accessToken
          setAccessTokenToLS(accessToken)
          setRefreshTokenToLS(refreshToken)
        }
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

      nProgress.done()
      return response
    },
    async function (error) {
      const statusCheck = error.response?.status

      // Chỉ toast lỗi không phải 422 và 401
      if (statusCheck && ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(statusCheck)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data?.message || error.message
        toast.error(message)
        if (message === 'User is banned') {
          accessToken = ''
          refreshToken = ''
          profile = null
          clearLS()
          store.dispatch(signout())
        }
      }

      if (isAxiosUnauthorized<ErrorResponseApi<{ name: string; message: string }>>(error)) {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        const { url } = config

        if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : HandleRefreshToken().finally(() => {
                setTimeout(() => {
                  refreshTokenRequest = null
                }, 3000)
              })

          await refreshTokenRequest
          return await http(config)
        } else {
          store.dispatch(signout())
        }
        if (url === URL_REFRESH_TOKEN) {
          HandleClearRedux()
        }

        clearLS()
        accessToken = ''
        refreshToken = ''
        profile = null
      }

      nProgress.done()
      return Promise.reject(error)
    }
  )

  const HandleRefreshToken = async () => {
    try {
      const res = await authApi.refreshToken(refreshToken)
      accessToken = res.data.data.accessToken
      setAccessTokenToLS(accessToken)
    } catch (err) {
      clearLS()
      accessToken = ''
      refreshToken = ''
      HandleClearRedux()
      throw err
    }
  }

  return http
}

const HandleClearRedux = () => {
  console.log('clear redux')
  window.location.reload()
}

const http = createHttpInstance()
export default http
