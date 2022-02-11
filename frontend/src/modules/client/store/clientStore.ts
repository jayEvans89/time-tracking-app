import { defineStore } from 'pinia'

export const useClientStore = defineStore('clientStore', {
  state: () => {
    return {
      activeClient: ''
    }
  },
  actions: {
    setActiveClient(clientId: string) {
      this.activeClient = clientId
    }
  }
})
