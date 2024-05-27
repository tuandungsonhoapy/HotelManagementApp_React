import { createSlice, AsyncThunk, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export interface interfaceCategory {
  id?: number
  categoryName: string
  description: string
  [key: string]: string | number | undefined
}

export interface interfaceRoom {
  id?: number
  roomNumber: string
  status: number
  price: number
  categoryId: number
  image: string
  description?: string | null
  Category?: interfaceCategory | null
  [key: string]: string | number | undefined | interfaceCategory | null
}

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

export const getRooms = createAsyncThunk('ROOM/GET_ROOMS', async () => {
  const response = await http.get('/rooms')
  return response.data
})

export const createRoom = createAsyncThunk('ROOM/CREATE_ROOM', async (data: interfaceRoom) => {
  const response = await http.post('/room/create', data)
  return response
})

export const updateRoom = createAsyncThunk('ROOM/UPDATE_ROOM', async (data: interfaceRoom) => {
  const response = await http.put(`/room/update`, data)
  return response
})

export const roomSlice = createSlice({
  name: 'ROOM',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<interfaceRoom[]>) => {
      state.rooms = action.payload
    },
    setRoom: (state, action: PayloadAction<interfaceRoom>) => {
      state.room = action.payload
    },
    setRoomNumber: (state, action: PayloadAction<string>) => {
      state.room.roomNumber = action.payload
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.room.price = action.payload
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.room.image = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.room.categoryId = action.payload
    },
    setRoomStatus: (state, action: PayloadAction<number>) => {
      state.room.status = action.payload
    },
    setDefaultRoom: (state) => {
      state.room = {
        id: 0,
        roomNumber: '',
        status: 0,
        price: 0,
        categoryId: 0,
        image: ''
      }
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.room.description = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.rooms = []
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action.payload
      })
      .addCase(getRooms.rejected, (state) => {
        state.rooms = []
      })
      .addMatcher<RejectedAction>(
        (action) => {
          return action.type.endsWith('rejected')
        },
        (state, action) => {
          state.rooms = []
        }
      )
      .addMatcher<PendingAction>(
        (action) => {
          return action.type.endsWith('pending')
        },
        (state, action) => {
          state.rooms = []
        }
      )
      .addDefaultCase((state) => state)
  }
})

export const {
  setRooms,
  setRoom,
  setPrice,
  setImage,
  setCategoryId,
  setRoomNumber,
  setRoomStatus,
  setDefaultRoom,
  setDescription
} = roomSlice.actions

const roomReducer = roomSlice.reducer

export default roomReducer
