import App from '@/core/App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import router from './core/router'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
