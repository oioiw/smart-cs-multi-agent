import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastProvider } from './hooks/ToastProvider'
import { ToastViewport } from './components/common/ToastViewport'
import { ErrorBoundary } from './components/common/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <App />
        <ToastViewport />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
