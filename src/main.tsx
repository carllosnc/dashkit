import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ButtonDocs from './pages/button.mdx'
import CheckboxDocs from './pages/checkbox.mdx'
import InputDocs from './pages/input.mdx'
import RadioDocs from './pages/radio.mdx'
import SelectDocs from './pages/select.mdx'
import SwitchDocs from './pages/switch.mdx'
import TabsDocs from './pages/tabs.mdx'
import OtpInputDocs from './pages/otp-input.mdx'
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
            <Route path="checkbox" element={<MdxWrapper Component={CheckboxDocs} />} />
            <Route path="radio" element={<MdxWrapper Component={RadioDocs} />} />
            <Route path="select" element={<MdxWrapper Component={SelectDocs} />} />
            <Route path="switch" element={<MdxWrapper Component={SwitchDocs} />} />
            <Route path="tabs" element={<MdxWrapper Component={TabsDocs} />} />
            <Route path="otp-input" element={<MdxWrapper Component={OtpInputDocs} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

