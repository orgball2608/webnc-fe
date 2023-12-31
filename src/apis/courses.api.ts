import { CourseItem, CourseStudentTeacher, MembersList } from 'src/types/course.type'
import { ClassCodeSchema, ClassSchema, InvitationSchema } from 'src/utils/rules'

import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { Role } from 'src/constants/enums'

const PREFIX = 'courses/'
const URL_GETCOURSEOFME = PREFIX + 'my-courses'
const URL_CREATE_COURSE = PREFIX
const URL_INVITE_BY_EMAIL = PREFIX + 'invite/email'

const courseApi = {
  getCoursesOfMe: () => {
    return http.get<ResponseApi<CourseItem[]>>(URL_GETCOURSEOFME)
  },
  //get list student and teacher in class
  getUserInClass: (classId: string) => {
    return http.get<ResponseApi<MembersList[]>>(`courses/${classId}/users`)
  },
  checkEnrolled: (classId: string) => {
    return http.get(`courses/enrollment-status/${classId}`)
  },
  //add user to class
  addUserToClass: (classId: string) => {
    return http.patch<ResponseApi<CourseItem>>(`courses/${classId}/enroll`)
  },
  createCourse: (body: ClassSchema) => http.post<ResponseApi<CourseItem>>(URL_CREATE_COURSE, body),
  getCourseDetail: (courseId: string) => http.get<ResponseApi<CourseItem>>(PREFIX + courseId),
  // invite user by email
  inviteUserByEmail: (body: InvitationSchema) => {
    return http.post<ResponseApi<null>>(URL_INVITE_BY_EMAIL, body)
  },
  acceptInvitation: (token: string) => {
    return http.post<ResponseApi<CourseStudentTeacher>>(`courses/join/${token}`)
  },
  deleteCourse: (courseId: string) => http.delete<ResponseApi<CourseItem>>(PREFIX + courseId),
  uploadBackground: (courseId: string, body: FormData) =>
    http.patch<ResponseApi<CourseItem>>(PREFIX + courseId + '/avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  deleteMember: ({ courseId, userId }: { courseId: string; userId: string }) => {
    return http.delete<ResponseApi<CourseItem>>(PREFIX + `${courseId}/users/${userId}`)
  },

  getTeachingCourse: (userId: string) => {
    return http.get<ResponseApi<CourseItem[]>>(PREFIX + `teacher/${userId}`)
  },

  getEnrolledCourse: (userId: string) => {
    return http.get<ResponseApi<CourseItem[]>>(PREFIX + `student/${userId}`)
  },

  joinCourseByCode: (body: ClassCodeSchema) => {
    return http.post<ResponseApi<CourseStudentTeacher>>(PREFIX + 'join-by-code', body)
  },

  getRoleInCourse: ({ courseId, userId }: { courseId: string; userId: string }) => {
    return http.get<ResponseApi<Role>>(PREFIX + `${courseId}/get-role/${userId}`)
  }
}

export default courseApi
