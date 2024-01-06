import { InfoStudent } from 'src/types/course.type'
import { Grade, GradeBoard, StudentGrade } from 'src/types/grade.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { GradeCompositionSchema } from 'src/utils/rules'

export type GradeRequestBody = Omit<GradeCompositionSchema, 'scale'> & { scale: number }
export type InfoGradeBoard = {
  gradeBoard: StudentGrade[]
  infoStudent: InfoStudent
}

const PREFIX = 'courses/'

const gradeApi = {
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
  },
  getGradeBoard: (courseId: string) => {
    return http.get<ResponseApi<GradeBoard>>(`${PREFIX}${courseId}/grade-boards/final`)
  },
  getGradeBoardTemplate: (courseId: string) => {
    return http.get<ResponseApi<GradeBoard>>(`${PREFIX}${courseId}/grade-boards/template`)
  },
  getMyGrade: (courseId: string) => {
    return http.get<ResponseApi<InfoGradeBoard>>(`${PREFIX}${courseId}/grade-boards/my-grade`)
  }
}

export default gradeApi
