import { createStore } from 'vuex'
import axios from 'axios'
import { UserAuthDetails } from '@/models/auth/userAuthDetails'

export default createStore({
  state: {
    token: '',
    baseUrl: 'http://localhost:3001',
    userId: '',
    companyId: '',
    activeModals: [] as Array<string>
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      axios.defaults.headers.Authorization = 'Bearer ' + token
    },
    setUserId(state, userId: string) {
      state.userId = userId
    },
    setCompanyId(state, companyId: string) {
      state.companyId = companyId
    },
    logout(state) {
      state.token = ''
    },
    addModal(state, id: string) {
      state.activeModals.push(id)
    },
    removeModal(state, id: string) {
      const index = state.activeModals.indexOf(id)
      state.activeModals.splice(index, 1)
    }
  },
  actions: {
    setToken(context, token) {
      context.commit('setToken', token)
    },
    setUserDetails(context, userDetails: UserAuthDetails) {
      context.commit('setUserId', userDetails.userId)
      context.commit('setCompanyId', userDetails.companyId)
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
  activeModals: Array<string>;
}
