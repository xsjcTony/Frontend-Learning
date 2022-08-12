/* eslint-disable import/order */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback'
import App from '@/App'
import 'normalize.css'
import '@/assets/css/global.css'


const root = document.querySelector('#app')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
