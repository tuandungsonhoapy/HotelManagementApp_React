import { interfaceRegister, interfaceLogin } from 'types/auth.type'

export const defaultFormRegister: interfaceRegister = {
  email: '',
  phone: '',
  username: '',
  password: '',
  confirmPassword: '',
  address: ''
}

export const defaultFormLogin: interfaceLogin = {
  username: '',
  password: ''
}
