import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/types/user.type'
import { clearLS, getAccessTokenFromLS, getProfileFromLS, setProfileToLS } from 'src/utils/auth'

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean
  profile: User | null
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS()
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<{ profile: User }>) => {
      const { profile } = action.payload

      // setProfileToLS(profile)
      state.isAuthenticated = true
      state.profile = profile
    },
    signout: (state) => {
      console.log('signout')

      state.isAuthenticated = false
      state.profile = null
    },
    updateProfile: (state, action: PayloadAction<{ updatedProfile: User }>) => {
      const { updatedProfile } = action.payload
      // Cập nhật thông tin trong state
      state.profile = updatedProfile
      // Cập nhật thông tin trong localStorage (nếu cần)
      setProfileToLS(updatedProfile)
    }
  }
})

export const { signin, signout, updateProfile } = authSlice.actions

export default authSlice.reducer
