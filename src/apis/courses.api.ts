import { ClassItem } from 'src/types/class.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GETCOURSEOFME = 'courses/mycourses/list'

const courseApi = {
  getCoursesOfMe: () => {
    return http.get<ResponseApi<ClassItem[]>>(URL_GETCOURSEOFME)
  }
}

export default courseApi
