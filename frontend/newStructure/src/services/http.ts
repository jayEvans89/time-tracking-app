import { useAuthStore } from '@/core/store/authStore'
import axios, { AxiosRequestConfig } from 'axios'

const authStore = useAuthStore()

interface Response {
  token?: string
}

const http = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'bearer ' + authStore.token,
    Credentials: 'include'
  },
  withCredentials: true
})

http.interceptors.request.use(async (req): Promise<AxiosRequestConfig<any>> => { // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log(`request: ${req.url}`)
  return req
})

http.interceptors.response.use(async (res) => {
  console.log(`response: ${res.status}`)
  const data = res.data as Response
  if (data.token) {
    authStore.setToken(data.token)
  }
  return res
}, async (error) => {
  console.error(`response error: ${error}`)
  return Promise.reject(error)
})

export default http
