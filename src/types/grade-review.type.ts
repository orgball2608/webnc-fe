import { ReviewComment } from './review-comment.type'
import { Grade } from './grade.type'
import { User } from './user.type'

export interface GradeReview {
  id: number
  gradeId: number
  expectedGrade: number
  explanation: string
  isResolve: boolean
  createdById: number
  ReviewComments?: ReviewComment[]
  grade: Grade
  createdBy: User

  createdAt: string
  updatedAt: string
}

export interface ReviewFull extends GradeReview {
  studentId?: string
  fullName?: string
  gradeName?: string
  compositionId?: number
  courseId?: number
}
