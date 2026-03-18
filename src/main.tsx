import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ButtonDocs from './pages/button.mdx'
import InputDocs from './pages/input.mdx'
import IntroductionDocs from './pages/introduction.mdx'
import { DocsLayout } from './layouts/DocsLayout.tsx'
import { MdxWrapper } from './layouts/MdxWrapper.tsx'

import { ThemeProvider } from './components/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<MdxWrapper Component={IntroductionDocs} />} />
            <Route path="introduction" element={<MdxWrapper Component={IntroductionDocs} />} />
            <Route path="button" element={<MdxWrapper Component={ButtonDocs} />} />
            <Route path="input" element={<MdxWrapper Component={InputDocs} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

