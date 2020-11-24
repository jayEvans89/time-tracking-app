import axios from 'axios'
import store from '../store'

export default axios.create({
  baseURL: store.state.baseUrl + '/api',
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'bearer ' + store.state.token
  },
  withCredentials: true
})
