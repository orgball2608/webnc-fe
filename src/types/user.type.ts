type Role = 'user' | 'admin'
export interface User {
  _id: string
  roles: Role[]
  email: string
  name: string
  avatar_url: string
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
