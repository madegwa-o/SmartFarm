import './global-polyfill'; // Import this first

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App loggedIn={isLoggedIn} />
  </StrictMode>,
)
