import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const PREFIX = 'excels/'

const excelApi = {
  exportStudentsTemplate: () => {
    return http.get(`${PREFIX}students-template/download`, {
      responseType: 'blob'
    })
  },
  exportGradesTemplate: (courseId: string) => {
    return http.get(`${PREFIX}courses/${courseId}/grades-template/download`, {
      responseType: 'blob'
    })
  },
  importStudentsFile: (courseId: string, body: FormData) => {
    return http.post<ResponseApi<null>>(`${PREFIX}courses/${courseId}/students/upload`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  importGrades: (courseId: string, gradeCompositionId: string, body: FormData) => {
    return http.post(`${PREFIX}courses/${courseId}/grade-compositions/${gradeCompositionId}/grades/upload`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  exportGradeboard: (courseId: string) => {
    return http.get(`${PREFIX}courses/${courseId}/grade-board/download`, {
      responseType: 'blob'
    })
  }
}

export default excelApi
