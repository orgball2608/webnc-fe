export interface CourseItem {
  id: number
  name: string
  avatar: null
  description: string
  room: string
  topic: string
  code: string
  year: number
  createdById: number
  status: boolean
  createdAt: string
  updatedAt: string
  createdBy: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}
