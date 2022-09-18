import eslintPlugin from '@nabla/vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    eslintPlugin({ formatter: 'stylish' }),
    tsconfigPaths({ loose: true }), // for .vue files
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false
              }
            }
          }
        ]
      }
    })
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
  },
  base: '/'
})
