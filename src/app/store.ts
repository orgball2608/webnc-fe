import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import authReducer from 'src/slices/auth.slice'
import classReducer from 'src/slices/class.slice'
import appReducer from 'src/slices/app.slice'

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    class: classReducer
  }
})

export default store

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
