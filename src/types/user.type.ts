type Role = 'user' | 'admin'

export interface User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  status: boolean
  phoneNumber: string
  address: string
  role: string
  isEmailConfirmed: boolean
  resetPasswordToken: null
  resetPasswordExpires: null
  createdAt: string
  updatedAt: string
}
