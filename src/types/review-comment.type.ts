import { GradeReview } from './grade-review.type'
import { User } from './user.type'

export interface ReviewComment {
  id: number
  reviewId: number
  body: string
  createdById: number
  review: GradeReview
  createdBy: User

  createdAt: string
  updatedAt: string
}
