import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { configDefaults } from 'vitest/config'


export default defineConfig({
  plugins: [
    solidPlugin(),
    eslintPlugin({
      formatter: 'stylish',
      eslintOptions: { cache: false }
    }),
    visualizer({
      filename: 'bundle-stats.html',
      gzipSize: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@assets': fileURLToPath(new URL('src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('src/pages', import.meta.url))
    }
  },
  server: {
    host: true
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        // @ts-expect-error @types/postcss-flexbugs-fixes internal error
        flexBugFixes()
      ]
    },
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  build: {
    target: 'esnext'
  },
  test: {
    include: ['src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
      exclude: [...configDefaults.coverage.exclude ?? []],
      all: true
    },
    setupFiles: [],
    environment: 'jsdom'
  }
})
