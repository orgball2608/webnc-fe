import { ReviewComment } from './ReviewComment.type'
import { Grade } from './grade.type'
import { User } from './user.type'

export interface GradeReview {
  id: number
  gradeId: number
  expectedGrade: number
  explanation: string
  isResolve: boolean
  createdById: number
  reviewComments?: ReviewComment[]
  grade: Grade
  createdBy: User

  createdAt: string
  updatedAt: string
}
