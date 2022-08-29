import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import 'normalize.css'
import '@/index.css'
import IntlProvider from '@/locales'
import AntdConfigProvider from '@/locales/AntdConfigProvider'
import store from '@/store'


const root = document.querySelector('#app')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <IntlProvider>
        <AntdConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AntdConfigProvider>
      </IntlProvider>
    </ReduxProvider>
  </StrictMode>
)
