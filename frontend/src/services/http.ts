import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: ''
})

http.interceptors.request.use(async (req): Promise<AxiosRequestConfig<any>> => { // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log(`request: ${req.url}`)
  return req
})

http.interceptors.response.use(async (res) => {
  console.log(`response: ${res.status}`)
  return res
}, async (error) => {
  console.error(`response error: ${error}`)
  return Promise.reject(error)
})

export default http
