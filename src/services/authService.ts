import http from 'Utils/httpRequest'
import { interfaceLogin, interfaceRegister } from 'types/auth.type'

const registerUser = (data: interfaceRegister) => {
  return http.post('register', data)
}

const loginUser = (data: interfaceLogin) => {
  return http.post('login', data)
}

const logoutUserApi = () => {
  return http.post('logout')
}

const getUserWithPagination = (currentPage: number, currentLimit: number) => {
  return http.get('users', {
    params: {
      page: currentPage,
      limit: currentLimit
    }
  })
}

const searchUser = (currentPage: number, currentLimit: number, search: string) => {
  return http.get('user/search', {
    params: {
      page: currentPage,
      limit: currentLimit,
      search
    }
  })
}

const createUser = (data: interfaceRegister) => {
  return http.post('user/create', data)
}

const updateUser = (data: interfaceRegister) => {
  return http.put('user/update', data)
}

const getUserAccount = () => {
  return http.get('account')
}

export {
  registerUser,
  loginUser,
  getUserWithPagination,
  createUser,
  updateUser,
  getUserAccount,
  logoutUserApi,
  searchUser
}
