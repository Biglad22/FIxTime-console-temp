import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'boxicons/css/boxicons.min.css';
import { UseProvider } from './store/UserContext'
import { WalletContext } from './store/WalletContext';
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletContext>
      <UseProvider>
        <App />
      </UseProvider>
    </WalletContext>
  </StrictMode>
)
