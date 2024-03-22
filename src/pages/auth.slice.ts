import { createSlice, AsyncThunk, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface interfaceUserLogin {
  isAuthenticated: boolean
  token: any
}

interface loginInfo {
  username: string
  password: string
}

interface registerInfo {
  firstName: string
  lastName: string
  username: string
  passwrod: string
  phone: string
}

interface AuthState {
  user: interfaceUserLogin
  loginInfo: loginInfo
  registerInfo: registerInfo
}

const initalState: AuthState = {
  user: {
    isAuthenticated: false,
    token: null
  },
  loginInfo: {
    username: '',
    password: ''
  },
  registerInfo: {
    firstName: '',
    lastName: '',
    username: '',
    passwrod: '',
    phone: ''
  }
}

export const register = createAsyncThunk('blog/addPost', async (body: registerInfo, thunkApi) => {
  try {
    const response = await http.post<registerInfo>('blogs', body)
    console.log('response from add blogs: ', response)
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError') return thunkApi.rejectWithValue(error.response.data)
    throw error
  }
})

export const authSlice = createSlice({
  name: 'AUTH',
  initialState: initalState,
  reducers: {
    loginUser: (state, action: PayloadAction<any>) => {
      state.user.isAuthenticated = true
      state.user.token = action.payload || null
    },
    logoutUser: (state) => {
      state.user.isAuthenticated = false
      state.user.token = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.fulfilled, (state, ))
    .addDefaultCase((state) => state)
  }
})

export const { loginUser, logoutUser } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
