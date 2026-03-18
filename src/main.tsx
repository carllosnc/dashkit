import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ButtonDocs from './pages/button.mdx'
import { DocsLayout } from './layouts/DocsLayout.tsx'
import { MdxWrapper } from './layouts/MdxWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route path="button" element={<MdxWrapper Component={ButtonDocs} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

