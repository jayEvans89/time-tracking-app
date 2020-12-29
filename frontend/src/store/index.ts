import { createStore } from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default createStore({
  state: {
    token: '',
    baseUrl: 'http://localhost:3001',
    userId: '',
    companyId: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      axios.defaults.headers.Authorization = 'Bearer ' + token
      const decodedToken = jwt.decode(token) as any // eslint-disable-line
      console.log('decoded token: ', decodedToken)
      if (decodedToken) {
        state.userId = decodedToken.user.id
        state.companyId = decodedToken.user.companyId
      }
    },
    logout(state) {
      state.token = ''
    }
  },
  actions: {
    setToken(context, token) {
      context.commit('setToken', token)
    }
  },
  modules: {
  }
})

export interface RootState {
  token: string;
  baseUrl: string;
  userId: string;
  companyId: string;
}
