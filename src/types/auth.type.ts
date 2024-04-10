export interface interfaceRegister {
  id?: number
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword?: string
  phone: string
  avatar?: string
  groupId: number
  [key: string]: string | number | undefined
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
