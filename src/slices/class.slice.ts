import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ClassState {
  invitationLink: string
}

// Define the initial state using that type
const initialState: ClassState = {
  invitationLink: ''
}

export const classSlice = createSlice({
  name: 'class',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInvitationLink: (state: ClassState, action: PayloadAction<string>) => {
      state.invitationLink = action.payload
    }
  }
})

export const { setInvitationLink } = classSlice.actions

export default classSlice.reducer
