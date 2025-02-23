import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter as Router} from 'react-router-dom'
import SearchProvider from './context/SearchNoteContext'
import AuthProvider from './context/AuthProvider'
createRoot(document.getElementById('root')).render(
  
  <Router>
    <SearchProvider>
 <AuthProvider>
 <App />
 </AuthProvider>
    </SearchProvider>

  </Router>
 
)
