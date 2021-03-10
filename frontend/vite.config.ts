import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: "@use '@/styles/global';"
  //     }
  //   }
  // }
}

export default config
