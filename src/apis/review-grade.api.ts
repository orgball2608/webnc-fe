import { GradeReview, ReviewFull } from 'src/types/grade-review.type'
import { Grade } from 'src/types/grade.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { GradeReviewSchema, UpdateGradeSchema } from 'src/utils/rules'

const PREFIX = 'courses/'

const gradeReviewApi = {
  createReviewGrade: (courseId: number, compositionId: number, gradeId: number, body: GradeReviewSchema) => {
    return http.post<ResponseApi<GradeReview>>(
      `${PREFIX}${courseId}/reviews/grade-compositions/${compositionId}/grades/${gradeId}`,
      body
    )
  },

  getReviewList: (courseId: number) => {
    return http.get<ResponseApi<ReviewFull[]>>(`${PREFIX}${courseId}/reviews/list`)
  },

  updateGrade: (courseId: number, compositionId: string, gradeId: number, body: UpdateGradeSchema) => {
    return http.patch<ResponseApi<Grade>>(
      `${PREFIX}${courseId}/grade-compositions/${compositionId}/grades/${gradeId}`,
      body
    )
  },

  markCompleted: (courseId: number, reviewId: number) => {
    return http.patch<ResponseApi<ReviewFull>>(`${PREFIX}${courseId}/reviews/${reviewId}/mark-completed`)
  },

  markInComplete: (courseId: number, reviewId: number) => {
    return http.patch<ResponseApi<ReviewFull>>(`${PREFIX}${courseId}/reviews/${reviewId}/mark-incomplete`)
  }
}

export default gradeReviewApi
