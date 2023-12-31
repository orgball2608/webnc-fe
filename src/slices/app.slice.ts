import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { CourseItem } from 'src/types/course.type'

interface Breadcrumb {
  name: string
  path: string
}

// Define a type for the slice state
interface AppState {
  breadcrumbs: Breadcrumb[]
}

// Define the initial state using that type
const initialState: AppState = {
  breadcrumbs: []
}

export const classSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBreadcrumbs: (state: AppState, action: PayloadAction<Breadcrumb[]>) => {
      state.breadcrumbs = action.payload
    },
    clearBreadcrumbs: (state: AppState) => {
      state.breadcrumbs = []
    }
  }
})

export const { setBreadcrumbs, clearBreadcrumbs } = classSlice.actions

export default classSlice.reducer
