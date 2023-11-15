import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import authReducer from 'src/slices/auth.slice'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
