import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App'

const container = document.getElementById('app')
if (container) {
  const root = createRoot(container)
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
} 