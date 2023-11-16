import axios from 'axios'
import { getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './auth'
import { URL_SIGNIN } from 'src/apis/auth.api'
import { SigninResponse } from 'src/types/auth.type'

function createHttpInstance() {
  let accessToken = getAccessTokenFromLS()
  let refreshToken = getRefreshTokenFromLS()

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
      }
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  return http
}

const http = createHttpInstance()
export default http
