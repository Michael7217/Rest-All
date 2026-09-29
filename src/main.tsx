import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Authprovider } from './context/provider/authprovider.tsx'
import { ToastProvider } from './context/provider/ToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <Authprovider>
            <App />
          </Authprovider>
        </ToastProvider>
      </BrowserRouter>
  </StrictMode>,
)
