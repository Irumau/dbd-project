import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router'
import { ClassDetails } from './pages/ClassDetails.jsx'
import App from './App.jsx'
import { Header } from './components/Header.jsx'

import 'normalize.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
        <Header/>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/class/:class" element={<ClassDetails/>} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
