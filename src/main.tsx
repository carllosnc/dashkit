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
import DividerDocs from './pages/divider.mdx'
import OtpInputDocs from './pages/otp-input.mdx'
import ImageExpanderDocs from './pages/image-expander.mdx'
import DrawerDocs from './pages/drawer.mdx'
import ModalDocs from './pages/modal.mdx'
import AccordionDocs from './pages/accordion.mdx'
import ToastDocs from './pages/toast.mdx'
import DropdownMenuDocs from './pages/dropdown-menu.mdx'
import BadgeDocs from './pages/badge.mdx'
import CardDocs from './pages/card.mdx'
import CliDocs from './pages/cli.mdx'
import IntroductionDocs from './pages/introduction.mdx'
import SkeletonDocs from './pages/skeleton.mdx'
import BreadcrumbDocs from './pages/breadcrumb.mdx'
import SpinnerDocs from './pages/spinner.mdx'
import NavbarDocs from './pages/navbar.mdx'
import IconButtonDocs from './pages/icon-button.mdx'
import TextareaDocs from './pages/textarea.mdx'
import ChipDocs from './pages/chip.mdx'
import ComboboxDocs from './pages/combobox.mdx'
import { LoginExample } from './pages/examples/LoginExample'
import { ComplexFormExample } from './pages/examples/ComplexFormExample'
import { DashboardExample } from './pages/examples/DashboardExample'
import { ExamplesList } from './pages/examples/ExamplesList'
import { NotFound } from './pages/NotFound.tsx'
import { DocsLayout } from './layouts/DocsLayout.tsx'
import { MdxWrapper } from './layouts/MdxWrapper.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { ToastProvider } from './components/Toast/Toast.tsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<MdxWrapper Component={IntroductionDocs} />} />
                <Route path="introduction" element={<MdxWrapper Component={IntroductionDocs} />} />
                <Route path="cli" element={<MdxWrapper Component={CliDocs} />} />
                <Route path="accordion" element={<MdxWrapper Component={AccordionDocs} />} />
                <Route path="badge" element={<MdxWrapper Component={BadgeDocs} />} />
                <Route path="breadcrumb" element={<MdxWrapper Component={BreadcrumbDocs} />} />
                <Route path="button" element={<MdxWrapper Component={ButtonDocs} />} />
                <Route path="card" element={<MdxWrapper Component={CardDocs} />} />
                <Route path="checkbox" element={<MdxWrapper Component={CheckboxDocs} />} />
                <Route path="chip" element={<MdxWrapper Component={ChipDocs} />} />
                <Route path="combobox" element={<MdxWrapper Component={ComboboxDocs} />} />
                <Route path="divider" element={<MdxWrapper Component={DividerDocs} />} />
                <Route path="drawer" element={<MdxWrapper Component={DrawerDocs} />} />
                <Route path="dropdown-menu" element={<MdxWrapper Component={DropdownMenuDocs} />} />
                <Route path="icon-button" element={<MdxWrapper Component={IconButtonDocs} />} />
                <Route path="image-expander" element={<MdxWrapper Component={ImageExpanderDocs} />} />
                <Route path="input" element={<MdxWrapper Component={InputDocs} />} />
                <Route path="modal" element={<MdxWrapper Component={ModalDocs} />} />
                <Route path="navbar" element={<MdxWrapper Component={NavbarDocs} />} />
                <Route path="otp-input" element={<MdxWrapper Component={OtpInputDocs} />} />
                <Route path="radio" element={<MdxWrapper Component={RadioDocs} />} />
                <Route path="select" element={<MdxWrapper Component={SelectDocs} />} />
                <Route path="skeleton" element={<MdxWrapper Component={SkeletonDocs} />} />
                <Route path="spinner" element={<MdxWrapper Component={SpinnerDocs} />} />
                <Route path="switch" element={<MdxWrapper Component={SwitchDocs} />} />
                <Route path="tabs" element={<MdxWrapper Component={TabsDocs} />} />
                <Route path="textarea" element={<MdxWrapper Component={TextareaDocs} />} />
                <Route path="toast" element={<MdxWrapper Component={ToastDocs} />} />
              </Route>
              <Route path="/examples">
                <Route index element={<ExamplesList />} />
                <Route path="login" element={<LoginExample />} />
                <Route path="complex-form" element={<ComplexFormExample />} />
                <Route path="dashboard" element={<DashboardExample />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
)
