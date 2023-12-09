import { ClassItem } from 'src/types/class.type'
import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GETCOURSEOFME = 'courses/mycourses/list'

type members = { students: User[]; teachers: User[] }

const courseApi = {
  getCoursesOfMe: () => {
    return http.get<ResponseApi<ClassItem[]>>(URL_GETCOURSEOFME)
  },

  //get list student and teacher in class
  getUserInClass: (classId: string) => {
    return http.get<ResponseApi<members>>(`courses/${classId}/users`)
  },

  checkEnrolled: (classId: string) => {
    return http.get(`courses/checkEnrolled/${classId}`)
  },

  //add user to class
  addUserToClass: (classId: string) => {
    console.log('addUserToClass')

    return http.patch<ResponseApi<ClassItem>>(`courses/${classId}/enroll`)
  }
}

export default courseApi
