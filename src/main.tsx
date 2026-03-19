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
import ImageExpanderDocs from './pages/image-expander.mdx'
import DrawerDocs from './pages/drawer.mdx'
import ModalDocs from './pages/modal.mdx'
import AccordionDocs from './pages/accordion.mdx'
import ToastDocs from './pages/toast.mdx'
import DropdownMenuDocs from './pages/dropdown-menu.mdx'
import IntroductionDocs from './pages/introduction.mdx'
import { DocsLayout } from './layouts/DocsLayout.tsx'
import { MdxWrapper } from './layouts/MdxWrapper.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { ToastProvider } from './components/Toast/Toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
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
              <Route path="image-expander" element={<MdxWrapper Component={ImageExpanderDocs} />} />
              <Route path="drawer" element={<MdxWrapper Component={DrawerDocs} />} />
              <Route path="modal" element={<MdxWrapper Component={ModalDocs} />} />
              <Route path="accordion" element={<MdxWrapper Component={AccordionDocs} />} />
              <Route path="toast" element={<MdxWrapper Component={ToastDocs} />} />
              <Route path="dropdown-menu" element={<MdxWrapper Component={DropdownMenuDocs} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
