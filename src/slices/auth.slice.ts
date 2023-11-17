import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getAccessTokenFromLS, setAccessTokenToLS } from 'src/utils/auth'

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessTokenFromLS())
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ access_token: string }>) => {
      setAccessTokenToLS(action.payload.access_token)
      state.isAuthenticated = true
    }
  }
})

export const { login } = authSlice.actions

export default authSlice.reducer
