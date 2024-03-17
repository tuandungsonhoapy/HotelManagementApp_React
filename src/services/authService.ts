import http from 'Utils/httpRequest'
import { interfaceLogin, interfaceRegister } from 'types/auth.type'

const registerUser = (data: interfaceRegister) => {
  return http.post('register', data)
}

const loginUser = (data: interfaceLogin) => {
  return http.post('login', data)
}

export { registerUser, loginUser }
