import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchProvider from './components/context/searchNoteContext'
import { BrowserRouter as Router} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <SearchProvider>
  <Router>
  <App />
  </Router>
  </SearchProvider>,
)
