import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import http from 'Utils/httpRequest'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  postList: Post[]
  editPostValue: Post | null | undefined
  loading: boolean
}

const initalState: BlogState = {
  postList: initalPostList,
  editPostValue: null,
  loading: false
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkApi) => {
  const response = await http.get<Post[]>('blogs')
  return response.data
})

export const addPost = createAsyncThunk('blog/addPost', async (body: Post, thunkApi) => {
  try {
    const payload: Post = {
      ...body,
      id: ''
    }
    const response = await http.post<Post>('blogs', payload)
    console.log('response from add blogs: ', response)
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError') return thunkApi.rejectWithValue(error.response.data)
    throw error
  }
})

export const deletePost = createAsyncThunk('blog/deletePost', async (id: string, thunkApi) => {
  await http.delete<Post>(`posts/${id}`)
  return id
})

export const updatePost = createAsyncThunk('blog/updatePost', async (body: Post, thunkApi) => {
  try {
    const response = await http.put<Post>(`posts/${body.id}`, body)
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError') return thunkApi.rejectWithValue(error.response.data)
    throw error
  }
})

export const blogSlice = createSlice({
  name: 'BLOG',
  initialState: initalState,
  reducers: {
    setEditPost: (state, action: PayloadAction<string>) => {
      const post = state.postList.find((post) => post.id === action.payload)
      state.editPostValue = post
    },
    cancelEditPost: (state) => {
      state.editPostValue = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const indexPost = state.postList.findIndex((post) => post.id === action.payload)
        if (indexPost !== -1) {
          state.postList.splice(indexPost, 1)
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editPostValue = null
      })
      .addMatcher<PendingAction>(
        (action) => action.type.includes('get') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => {
          if (action.type.endsWith('/fulfilled')) return true
          return false
        },
        (state) => {
          state.loading = false
        }
      )
      .addDefaultCase((state) => state)
  }
})

export const { cancelEditPost, setEditPost } = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer
