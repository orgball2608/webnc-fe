import { Grade } from 'src/types/grade.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { GradeCompositionSchema } from 'src/utils/rules'

export type GradeRequestBody = Omit<GradeCompositionSchema, 'scale'> & { scale: number }

const PREFIX = 'courses/'

const gradeCompositionApi = {
  getGrades: (courseId: string, compositionId: string) => {
    return http.get<ResponseApi<Grade[]>>(`${PREFIX}${courseId}/grade-compositions/${compositionId}/grades`)
  },
  getGrade: (courseId: string, compositionId: string, gradeId: string) => {
    return http.get<ResponseApi<Grade[]>>(`${PREFIX}${courseId}/grade-compositions/${compositionId}/grades/${gradeId}`)
  },
  createGrade: (courseId: string, compositionId: string, body: GradeRequestBody) => {
    return http.post<ResponseApi<Grade>>(`${PREFIX}${courseId}/grade-compositions/${compositionId}/grades`, body)
  },
  updateGrade: (courseId: string, compositionId: string, gradeId: string, body: GradeRequestBody) => {
    return http.patch<ResponseApi<Grade>>(
      `${PREFIX}${courseId}/grade-compositions/${compositionId}/grades/${gradeId}`,
      body
    )
  },
  deleteGrade: (courseId: string, compositionId: string, gradeId: string) => {
    return http.delete<ResponseApi<Grade>>(`${PREFIX}${courseId}/grade-compositions/${compositionId}/grades/${gradeId}`)
  }
}

export default gradeCompositionApi
