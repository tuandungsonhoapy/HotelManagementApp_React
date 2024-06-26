import axios, { AxiosInstance } from 'axios'
// import { store } from '../store'
import { Store } from '@reduxjs/toolkit'

function getCookie(cname: string) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

class Http {
  instance: AxiosInstance
  store: Store | null = null
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000
    })

    // store.subscribe(() => {
    //   this.instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user.token}`
    // })

    // const jwtCookie = getCookie('jwt')

    // this.instance.defaults.headers.common['Authorization'] = `Bearer ${jwtCookie}`
    this.instance.defaults.withCredentials = true

    // Add a request interceptor
    this.instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response?.status || 500
        switch (status) {
          // authentication (token related issues)
          case 401: {
            return Promise.reject(error.response.data)
          }

          // forbidden (permission related issues)
          case 403: {
            return Promise.reject(error.response.data)
          }

          // bad request
          case 400: {
            return Promise.reject(error.response.data)
          }

          // not found
          case 404: {
            return Promise.reject(error.response.data)
          }

          // conflict
          case 409: {
            return Promise.reject(error.response.data)
          }

          // unprocessable
          case 422: {
            return Promise.reject(error.response.data)
          }

          // generic api error (server related) unexpected
          default: {
            return Promise.reject(error.response.data)
          }
        }
      }
    )
  }

  setStore(store: Store) {
    this.store = store
    this.store.subscribe(() => {
      if (this.instance && this.store) {
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.store.getState().auth.user.token}`
      }
    })
  }
}

export const httpObject = new Http()
const http = httpObject.instance

export default http
