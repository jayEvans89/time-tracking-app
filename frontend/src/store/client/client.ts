
export default {
  namespaced: true,
  state: {
    activeClient: '',
  },
  mutations: {
    setActiveClient(state: ClientState, clientId: string) {
      state.activeClient = clientId
    }
  },
  actions: {
  },
  modules: {
  }
}

export interface ClientState {
  activeClient: string;
}
