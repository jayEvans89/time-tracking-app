import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    token: '',
    baseUrl: 'http://localhost:3001'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      axios.defaults.headers.Authorization = 'Bearer ' + token
    }
  },
  actions: {
  },
  modules: {
  },
});

export interface RootState {
  token: string;
  baseUrl: string;
}
