import { fileURLToPath, URL } from 'url'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'


/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: 'error.html'
    }),
    prerender: {
      entries: []
    },
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    },
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/50projects50days-svelte' : ''
    }
  }
}


export default config
