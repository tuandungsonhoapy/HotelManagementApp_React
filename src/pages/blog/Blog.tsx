import { RootState } from 'store'
import CreatePost from './components/CreatePost'
import PostList from './components/PostList'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import configRoutes from '../../config'

function Blog() {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user.isAuthenticated)

  useEffect(() => {
    if (!currentUser) {
      navigate(configRoutes.routes.login)
    }
  }, [currentUser, navigate])

  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default Blog
