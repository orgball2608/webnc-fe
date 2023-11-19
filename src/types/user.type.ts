type Role = 'user' | 'admin'

export interface User {
  id: number
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  role: string
  avatar: string
}
