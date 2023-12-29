import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { CourseItem } from 'src/types/course.type'

// Define a type for the slice state
interface ClassState {
  invitationLink: string
  courseList: CourseItem[]
  roleInCourse: { classId: string; role: string }
}

// Define the initial state using that type
const initialState: ClassState = {
  invitationLink: '',
  courseList: [],
  roleInCourse: { classId: '', role: '' }
}

export const classSlice = createSlice({
  name: 'class',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInvitationLink: (state: ClassState, action: PayloadAction<string>) => {
      state.invitationLink = action.payload
    },

    setMyClass: (state: ClassState, action: PayloadAction<{ courseList: CourseItem[] }>) => {
      const { courseList } = action.payload
      state.courseList = courseList
    },

    setRoleInCourses: (state: ClassState, action: PayloadAction<{ classId: string; role: string }>) => {
      const { classId, role } = action.payload
      state.roleInCourse = { classId, role }
    }
  }
})

export const { setInvitationLink, setMyClass, setRoleInCourses } = classSlice.actions

export default classSlice.reducer
