import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './app/providers'
import Router from './app/Router'
import { AuthProvider } from './app/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Providers>
  </StrictMode>,
)
