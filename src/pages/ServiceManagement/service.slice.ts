import { createSlice, AsyncThunk, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export interface Service {
  id?: number
  serviceName: string
  description: string
  price: number
  [key: string]: string | number | undefined
}

interface ServiceState {
  services: Service[]
  service: Service
}

const initialState: ServiceState = {
  services: [],
  service: {
    id: 0,
    serviceName: '',
    description: '',
    price: 0
  }
}

export const getServices = createAsyncThunk('SERVICE/GET_SERVICES', async () => {
  const response = await http.get('/services')
  return response
})

export const createService = createAsyncThunk('SERVICE/CREATE_SERVICE', async (data: Service) => {
  const response = await http.post('/service/create', data)
  return response
})

export const updateService = createAsyncThunk('SERVICE/UPDATE_SERVICE', async (data: Service) => {
  const response = await http.put(`/service/update`, data)
  return response
})

export const deleteService = createAsyncThunk('SERVICE/DELETE_SERVICE', async (id: number) => {
  const response = await http.delete(`/service/delete/${id}`)
  return response
})

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService(state, action: PayloadAction<Service>) {
      state.service = action.payload
    },
    setDefaultService(state) {
      state.service = initialState.service
    },
    setServiceName(state, action: PayloadAction<string>) {
      state.service.serviceName = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.service.description = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.service.price = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload.data
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload.data)
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.services = state.services.map((service) =>
          service.id === action.payload.data.id ? action.payload.data : service
        )
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.id !== action.payload.data.id)
      })
      .addDefaultCase((state) => state)
  }
})

export const { setService, setDefaultService, setServiceName, setDescription, setPrice } = serviceSlice.actions

const serviceReducer = serviceSlice.reducer

export default serviceReducer
