import { interfaceRegister, interfaceLogin } from 'types/auth.type'

export const defaultFormRegister: interfaceRegister = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  avatar: '',
  groupId: 1
}

export const defaultFormLogin: interfaceLogin = {
  username: '',
  password: ''
}
