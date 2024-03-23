export interface interfaceRegister {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
  phone: string
  avatar: string
}

export interface interfaceLogin {
  username: string
  password: string
}

export interface dataResponse {
  message: string
  code: number
  data: any
}
