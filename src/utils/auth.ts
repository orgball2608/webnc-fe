import { User } from 'src/types/user.type'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const PROFILE_KEY = 'profile'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  if (result) return JSON.parse(result) as User
  return null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export const clearLS = () => {
  localStorage.clear()
}
