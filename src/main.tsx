import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ButtonDocs } from './pages/ButtonDocs.tsx'
import { DocsLayout } from './layouts/DocsLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route path="button" element={<ButtonDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
