import { Role } from 'src/constants/enums'
import { User } from './user.type'

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
    id: number
    email: string
    avatar: string | null
    firstName: string
    lastName: string
  }
  enrollments: {
    studentId: number
    createdAt: string
  }[]
  courseTeachers: {
    teacherId: number
    createdAt: string
  }[]
}

export interface CourseStudentTeacher {
  courseId: number
}

export type Member = Pick<User, 'id' | 'email' | 'avatar' | 'firstName' | 'lastName' | 'address' | 'phoneNumber'>
export type MembersList = {
  createdById: number
  enrollments: { student: Member }[]
  courseTeachers: { teacher: Member }[]
}

export type ContextType = {
  id: string | undefined
  data: CourseItem | null
  refetch: () => void
  members: MembersList
  myRole: Role
  isLoading: boolean
  isPending: boolean
  isSuccess: boolean
  isLoadingMyrole: boolean
}

export type InfoStudent = {
  studentId: string
  fullName: string
}
