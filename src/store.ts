import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.slice'
import { useDispatch } from 'react-redux'
import authReducer from 'pages/auth.slice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer
  }
})

//Lấy rootstate và appdispatch từ store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
