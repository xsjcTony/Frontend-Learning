import '@assets/index.scss'
import App from '@/App.svelte'


const rootEl = document.querySelector('#app')

if (!rootEl) {
  throw new Error('No root element found')
}


const app = new App({
  target: rootEl
})


export default app
