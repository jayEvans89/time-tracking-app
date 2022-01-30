import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: '',
    baseUrl: 'http://localhost:3001'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      axios.defaults.headers.Authorization = 'Bearer ' + token
    },
    logout(state) {
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  }
})

export interface RootState {
  token: string;
  baseUrl: string;
}
