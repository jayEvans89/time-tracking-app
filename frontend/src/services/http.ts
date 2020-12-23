import axios from 'axios'
import store from '../store'

const http = axios.create({
  baseURL: store.state.baseUrl + '/api',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'bearer ' + store.state.token,
    Credentials: 'include'
  },
  withCredentials: true
})

http.interceptors.response.use((res) => {
  console.log('response interceptor: ', res.data)
  if (res.data.token) {
    store.dispatch('setToken', res.data.token)
  }
  return res
})

export default http
