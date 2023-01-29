import { fileURLToPath, URL } from 'url'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import type { Config } from '@sveltejs/kit'

const config: Config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  }
}


export default config
