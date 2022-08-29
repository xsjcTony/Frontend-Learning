import eslintPlugin from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    eslintPlugin({ formatter: 'stylish' }),
    tsconfigPaths()
  ],
  /*
  server: {
    host: true // if needed to access from other devices
  },
  */
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        flexBugFixes()
      ]
    }
  }
})
