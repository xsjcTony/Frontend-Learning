/* @refresh reload */

import '@assets/styles/index.scss'

import { render } from 'solid-js/web'
import App from '@/App'


const rootEl = document.querySelector('#root')

if (!rootEl) {
  throw new Error('Root element not found')
}


render(() => <App />, rootEl)
