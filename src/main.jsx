import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'boxicons/css/boxicons.min.css';
import { UseProvider } from './store/UserContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseProvider>
      <App />
    </UseProvider>
  </StrictMode>
)
