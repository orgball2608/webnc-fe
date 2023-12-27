import { GradeComposition } from 'src/types/grade-composition.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { GradeCompositionSchema } from 'src/utils/rules'

export type GradeCompositionRequestBody = Omit<GradeCompositionSchema, 'scale'> & { scale: number }

const PREFIX = 'courses/'

const gradeCompositionApi = {
  getGradeCompositions: (courseId: string) => {
    return http.get<ResponseApi<GradeComposition[]>>(`${PREFIX}${courseId}/grade-compositions`)
  },
  createGradeComposition: (courseId: string, body: GradeCompositionRequestBody) => {
    return http.post<ResponseApi<GradeComposition>>(`${PREFIX}${courseId}/grade-compositions`, body)
  },
  updateGradeComposition: (courseId: string, body: GradeCompositionRequestBody) => {
    return http.patch<ResponseApi<GradeComposition>>(`${PREFIX}${courseId}/grade-compositions/${body.id}`, body)
  },
  deleteGradeComposition: (courseId: string, gradeCompositionId: number) => {
    return http.delete<ResponseApi<GradeComposition>>(`${PREFIX}${courseId}/grade-compositions/${gradeCompositionId}`)
  },
  sortGradeCompositions: (courseId: string, firstGradeCompositionId: number, secondGradeCompositionId: number) => {
    return http.post<ResponseApi<GradeComposition>>(
      `${PREFIX}${courseId}/grade-compositions/${firstGradeCompositionId}/switch-index/${secondGradeCompositionId}`
    )
  }
}

export default gradeCompositionApi
