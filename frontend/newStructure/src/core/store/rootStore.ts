import { defineStore } from 'pinia'

export const useRootStore = defineStore('rootStore', {
  state: () => {
    return {
      name: ''
    }
  },
  actions: {
    setName(name: string) {
      this.name = name
    }
  }
})
