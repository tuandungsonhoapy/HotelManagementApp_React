import { createSlice, AsyncThunk, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'
import { interfaceRoom } from './RoomManagement/room.slice'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface RoomState {
  rooms: interfaceRoom[]
  room: interfaceRoom
}

const initialState: RoomState = {
  rooms: [],
  room: {
    id: 0,
    roomNumber: '',
    status: 0,
    price: 0,
    categoryId: 0,
    image: ''
  }
}

export const getRoom = createAsyncThunk('BOOKING/GET_ROOM', async (id: number) => {
  const response = await http.get(`/room/${id}`)
  return response.data
})

export const booking = createAsyncThunk('BOOKING/BOOKING', async (data: any) => {
  const response = await http.post('/booking/create', data)
  return response.data
})

export const bookingSlice = createSlice({
  name: 'BOOKING',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.pending, (state) => {
        state.room = initialState.room
      })
      .addCase(getRoom.fulfilled, (state, action: PayloadAction<interfaceRoom>) => {
        state.room = action.payload
      })
      .addDefaultCase((state) => state)
  }
})

export const {} = bookingSlice.actions

const bookingReducer = bookingSlice.reducer

export default bookingReducer
