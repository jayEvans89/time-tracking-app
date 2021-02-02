import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { ClientState } from '@/store/client/client'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    token: string;
    baseUrl: string;
    userId: string;
    companyId: string;
    activeModals: Array<string>;
    client?: ClientState;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
