import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import StylelintPlugin from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    StylelintPlugin(),
    eslintPlugin({
      cache: false
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@styles': path.join(__dirname, 'src/styles')
    }
  },
  server: {
    port: 8081
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          login: [
            './src/modules/login/Login.vue',
            './src/modules/login/SignUp.vue'
          ]
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
