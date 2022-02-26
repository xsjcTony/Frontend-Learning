/* eslint '@typescript-eslint/no-unnecessary-condition': 'off' */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from '@nabla/vite-plugin-eslint'


export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      formatter: 'stylish'
    })
  ]
  /*
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  */
})
