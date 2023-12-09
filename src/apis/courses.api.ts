import { CourseItem } from 'src/types/course.type'
import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { ClassSchema } from 'src/utils/rules'

const PREFIX = 'courses/'
const URL_GETCOURSEOFME = PREFIX + 'mycourses/list'
const URL_CREATE_COURSE = PREFIX

type Members = { students: User[]; teachers: User[] }

const courseApi = {
  getCoursesOfMe: () => {
    return http.get<ResponseApi<CourseItem[]>>(URL_GETCOURSEOFME)
  },

  //get list student and teacher in class
  getUserInClass: (classId: string) => {
    return http.get<ResponseApi<Members>>(`courses/${classId}/users`)
  },

  createCourse: (body: ClassSchema) => http.post<ResponseApi<CourseItem>>(URL_CREATE_COURSE, body),
  getCourseDetail: (courseId: string) => http.get<ResponseApi<CourseItem>>(PREFIX + courseId)
}

export default courseApi
