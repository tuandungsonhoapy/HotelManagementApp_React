import axios, { AxiosInstance } from 'axios'
import { store } from 'store'

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
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000
    })

    store.subscribe(() => {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user.token}`
    })

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
            return Promise.reject(error)
          }

          // forbidden (permission related issues)
          case 403: {
            return Promise.reject(error)
          }

          // bad request
          case 400: {
            return Promise.reject(error)
          }

          // not found
          case 404: {
            return Promise.reject(error)
          }

          // conflict
          case 409: {
            return Promise.reject(error)
          }

          // unprocessable
          case 422: {
            return Promise.reject(error)
          }

          // generic api error (server related) unexpected
          default: {
            return Promise.reject(error.response.data)
          }
        }
      }
    )
  }
}

const http = new Http().instance

export default http
