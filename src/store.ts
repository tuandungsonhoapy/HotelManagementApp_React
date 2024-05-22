import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.slice'
import { useDispatch } from 'react-redux'
import authReducer from 'pages/auth.slice'
import roomReducer from 'pages/RoomManagement/room.slice'
import bookingReducer from 'pages/booking.slice'
import { httpObject } from 'Utils/httpRequest'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer
  }
})

httpObject.setStore(store)

//Lấy rootstate và appdispatch từ store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
