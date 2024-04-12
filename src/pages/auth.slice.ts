import { createSlice, AsyncThunk, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'
import { defaultFormRegister, defaultFormLogin } from 'constants/register'
import { interfaceRegister, interfaceLogin } from 'types/auth.type'
import { dataResponse } from 'types/auth.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface interfaceUserLogin {
  isAuthenticated: boolean
  token: any
  username: string
  avatar: string
  groupWithRoles: any
}

interface AuthState {
  user: interfaceUserLogin
  loginInfo: interfaceLogin
  registerInfo: interfaceRegister
  pageLoading: any
}

const initalState: AuthState = {
  user: {
    isAuthenticated: false,
    token: null,
    username: '',
    avatar: '',
    groupWithRoles: {}
  },
  loginInfo: {
    username: '',
    password: ''
  },
  registerInfo: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phone: '',
    confirmPassword: '',
    avatar: '',
    groupId: 1
  },
  pageLoading: {
    isShow: true
  }
}

export const register = createAsyncThunk<any, interfaceRegister>(
  'auth/register',
  async (body: interfaceRegister, thunkApi) => {
    try {
      const response = await http.post<dataResponse>('register', body)
      return response
    } catch (error: any) {
      if (error.name === 'AxiosError') return thunkApi.rejectWithValue(error.response.data)
      throw error
    }
  }
)

export const login = createAsyncThunk('auth/login', async (body: interfaceLogin, thunkApi) => {
  try {
    const response = await http.post<any>('login', body)
    return response
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
    },
    setDefaultFormLogin: (state) => {
      state.loginInfo = defaultFormLogin
    },
    setDefaultFormRegister: (state) => {
      state.registerInfo = defaultFormRegister
    },
    setUsernameRegister: (state, action: PayloadAction<string>) => {
      state.registerInfo.username = action.payload
    },
    setFirstNameRegister: (state, action: PayloadAction<string>) => {
      state.registerInfo.firstName = action.payload
    },
    setLastNameRegister: (state, action: PayloadAction<string>) => {
      state.registerInfo.lastName = action.payload
    },
    setPasswordRegister: (state, action: PayloadAction<string>) => {
      state.registerInfo.password = action.payload
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.registerInfo.confirmPassword = action.payload
    },
    setPhoneRegister: (state, action: PayloadAction<string>) => {
      state.registerInfo.phone = action.payload
    },
    setUsernameLogin: (state, action: PayloadAction<string>) => {
      state.loginInfo.username = action.payload
    },
    setPasswordLogin: (state, action: PayloadAction<string>) => {
      state.loginInfo.password = action.payload
    },
    setGroupRegister: (state, action: PayloadAction<number>) => {
      state.registerInfo.groupId = action.payload
    },
    setShowUpdateUser: (state, action: PayloadAction<interfaceRegister>) => {
      console.log(action.payload)
      state.registerInfo = action.payload
    },
    setLogin: (state, action: PayloadAction<any>) => {
      const data = action.payload
      state.user.token = data.access_token
      state.user.username = data.user.username
      state.user.avatar = data.user.avatar
      state.user.groupWithRoles = data.user.groupWithRoles
      state.user.isAuthenticated = true
    },
    setShowPageLoading: (state) => {
      state.pageLoading.isShow = true
    },
    setHiddenPageLogin: (state) => {
      state.pageLoading.isShow = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.registerInfo = defaultFormRegister
      })
      .addCase(login.fulfilled, (state, action) => {
        state.registerInfo = defaultFormRegister
        state.loginInfo = defaultFormLogin
        state.user.isAuthenticated = true
        state.user.token = action.payload.data.access_token || null
        state.user.avatar = action.payload.data.user.avatar
        state.user.username = action.payload.data.user.username
        state.user.groupWithRoles = action.payload.data.groupWithRoles
      })
      .addDefaultCase((state) => state)
  }
})

export const {
  loginUser,
  logoutUser,
  setDefaultFormLogin,
  setDefaultFormRegister,
  setUsernameRegister,
  setConfirmPassword,
  setFirstNameRegister,
  setLastNameRegister,
  setPhoneRegister,
  setPasswordRegister,
  setUsernameLogin,
  setPasswordLogin,
  setGroupRegister,
  setShowUpdateUser,
  setLogin,
  setShowPageLoading,
  setHiddenPageLogin
} = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
