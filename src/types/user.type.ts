type Role = 'user' | 'admin'

export interface User {
  id: number
  email: string
  name: string
  avatar_url: string
  date_of_birth: null
  address: string
  role: string
  isEmailConfirmed: boolean
  resetPasswordToken: null
  resetPasswordExpires: null
  createdAt: string
  updatedAt: string
}
