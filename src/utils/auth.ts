import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  if (result) return JSON.parse(result)
  return null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
