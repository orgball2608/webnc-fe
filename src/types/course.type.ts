export interface CourseItem {
  id: number
  name: string
  avatar: null
  description: string
  room: string
  topic: string
  code: string
  year: number
  createdById: number
  status: boolean
  createdAt: string
  updatedAt: string
  createdBy: {
    id: number
    email: string
    avatar: string | null
    firstName: string
    lastName: string
  }
  enrollments: {
    studentId: number
    createdAt: string
  }[]
  courseTeachers: {
    teacherId: number
    createdAt: string
  }[]
}

export interface CourseStudentTeacher {
  courseId: number
}

const a = {
  enrollments: [
    {
      studentId: 4,
      createdAt: '2023-12-17T03:08:29.771Z'
    }
  ],
  courseTeachers: [
    {
      teacherId: 3,
      createdAt: '2023-12-17T02:47:24.951Z'
    }
  ]
}
