import { fileURLToPath } from 'url'
import eslintPlugin from '@nabla/vite-plugin-eslint'
// @ts-expect-error tsconfig or `ambient.d.ts` reference error
import { sveltekit } from '@sveltejs/kit/vite'
import autoprefixer from 'autoprefixer'
import flexBugFixes from 'postcss-flexbugs-fixes'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from 'tailwindcss'
import { configDefaults } from 'vitest/config'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
    sveltekit(),
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
      '@': fileURLToPath(new URL('src', import.meta.url))
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
}

export default config
