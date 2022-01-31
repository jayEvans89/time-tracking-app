import http from '@/services/http'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      token: ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      http.defaults.headers.common.Authorization = 'Bearer ' + token
    },
    logout() {
      this.token = ''
    }
  }
})
