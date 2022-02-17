import http from '@/services/http'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      token: '',
      userId: ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      http.defaults.headers.common.Authorization = 'Bearer ' + token
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    logout() {
      this.token = ''
      this.userId = ''
    }
  }
})
