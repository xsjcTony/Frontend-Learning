import type { FallbackProps } from 'react-error-boundary'


const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps): JSX.Element => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

export default ErrorBoundaryFallback
