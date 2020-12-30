import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    token: string;
    baseUrl: string;
    userId: string;
    companyId: string;
    activeModals: Array<string>;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
