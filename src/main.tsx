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
import TooltipDocs from './pages/tooltip.mdx'
import DockDocs from './pages/dock.mdx'
import TabsDocs from './pages/tabs.mdx'
import SidebarDocs from './pages/sidebar.mdx'
import SliderDocs from './pages/slider.mdx'
import SurfaceDocs from './pages/surface.mdx'
import DividerDocs from './pages/divider.mdx'
import DatePickerDocs from './pages/datepicker.mdx'
import TableDocs from './pages/table.mdx'
import OtpInputDocs from './pages/otp-input.mdx'
import ButtonGroupDocs from './pages/button-group.mdx'
import ImageExpanderDocs from './pages/image-expander.mdx'
import AreaChartDocs from './pages/area-chart.mdx'
import BarChartDocs from './pages/bar-chart.mdx'
import LineChartDocs from './pages/line-chart.mdx'
import PieChartDocs from './pages/pie-chart.mdx'
import ChartsDocs from './pages/charts.mdx'
import DrawerDocs from './pages/drawer.mdx'
import ModalDocs from './pages/modal.mdx'
import AccordionDocs from './pages/accordion.mdx'
import ToastDocs from './pages/toast.mdx'
import DropdownMenuDocs from './pages/dropdown-menu.mdx'
import BadgeDocs from './pages/badge.mdx'
import CardDocs from './pages/card.mdx'
import CliDocs from './pages/cli.mdx'
import IntroductionDocs from './pages/introduction.mdx'
import CustomizationDocs from './pages/customization.mdx'
import SkeletonDocs from './pages/skeleton.mdx'
import BreadcrumbDocs from './pages/breadcrumb.mdx'
import SpinnerDocs from './pages/spinner.mdx'
import StepperDocs from './pages/stepper.mdx'
import PaginationDocs from './pages/pagination.mdx'
import NavbarDocs from './pages/navbar.mdx'
import IconButtonDocs from './pages/icon-button.mdx'
import TextareaDocs from './pages/textarea.mdx'
import ChipDocs from './pages/chip.mdx'
import ComboboxDocs from './pages/combobox.mdx'
import AvatarDocs from './pages/avatar.mdx'
import ProgressBarDocs from './pages/progressbar.mdx'
import PopoverDocs from './pages/popover.mdx'
import AnimateNumberDocs from './pages/animate-number.mdx'
import CircularProgressDocs from './pages/circular-progress.mdx'
import FloatActionMenuDocs from './pages/float-action-menu.mdx'
import SystemLogsDocs from './pages/system-logs.mdx'
import { LoginExample } from './pages/examples/LoginExample'
import { ComplexFormExample } from './pages/examples/ComplexFormExample'
import { DashboardExample } from './pages/examples/DashboardExample'
import { SidebarDashboardExample } from './pages/examples/SidebarDashboardExample'
import { AllComponentsExample } from './pages/examples/AllComponentsExample'
import { ExamplesList } from './pages/examples/ExamplesList'
import { NotFound } from './pages/NotFound.tsx'
import { DocsLayout } from './layouts/DocsLayout.tsx'
import { ChartsLayout } from './layouts/ChartsLayout.tsx'
import { MdxWrapper } from './layouts/MdxWrapper.tsx'
import { ThemeProvider } from './partials/ThemeProvider'
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
                <Route path="customization" element={<MdxWrapper Component={CustomizationDocs} />} />
                <Route path="accordion" element={<MdxWrapper Component={AccordionDocs} />} />
                <Route path="animate-number" element={<MdxWrapper Component={AnimateNumberDocs} />} />
                <Route path="circular-progress" element={<MdxWrapper Component={CircularProgressDocs} />} />
                <Route path="badge" element={<MdxWrapper Component={BadgeDocs} />} />
                <Route path="breadcrumb" element={<MdxWrapper Component={BreadcrumbDocs} />} />
                <Route path="button" element={<MdxWrapper Component={ButtonDocs} />} />
                <Route path="button-group" element={<MdxWrapper Component={ButtonGroupDocs} />} />
                <Route path="card" element={<MdxWrapper Component={CardDocs} />} />
                <Route path="checkbox" element={<MdxWrapper Component={CheckboxDocs} />} />
                <Route path="chip" element={<MdxWrapper Component={ChipDocs} />} />
                <Route path="combobox" element={<MdxWrapper Component={ComboboxDocs} />} />
                <Route path="divider" element={<MdxWrapper Component={DividerDocs} />} />
                <Route path="datepicker" element={<MdxWrapper Component={DatePickerDocs} />} />
                <Route path="drawer" element={<MdxWrapper Component={DrawerDocs} />} />
                <Route path="avatar" element={<MdxWrapper Component={AvatarDocs} />} />
                <Route path="dropdown-menu" element={<MdxWrapper Component={DropdownMenuDocs} />} />
                <Route path="icon-button" element={<MdxWrapper Component={IconButtonDocs} />} />
                <Route path="image-expander" element={<MdxWrapper Component={ImageExpanderDocs} />} />
                <Route path="input" element={<MdxWrapper Component={InputDocs} />} />
                <Route path="modal" element={<MdxWrapper Component={ModalDocs} />} />
                <Route path="navbar" element={<MdxWrapper Component={NavbarDocs} />} />
                <Route path="otp-input" element={<MdxWrapper Component={OtpInputDocs} />} />
                <Route path="pagination" element={<MdxWrapper Component={PaginationDocs} />} />
                <Route path="radio" element={<MdxWrapper Component={RadioDocs} />} />
                <Route path="select" element={<MdxWrapper Component={SelectDocs} />} />
                <Route path="skeleton" element={<MdxWrapper Component={SkeletonDocs} />} />
                <Route path="spinner" element={<MdxWrapper Component={SpinnerDocs} />} />
                <Route path="stepper" element={<MdxWrapper Component={StepperDocs} />} />
                <Route path="table" element={<MdxWrapper Component={TableDocs} />} />
                <Route path="progressbar" element={<MdxWrapper Component={ProgressBarDocs} />} />
                <Route path="switch" element={<MdxWrapper Component={SwitchDocs} />} />
                <Route path="slider" element={<MdxWrapper Component={SliderDocs} />} />
                <Route path="surface" element={<MdxWrapper Component={SurfaceDocs} />} />
                <Route path="sidebar" element={<MdxWrapper Component={SidebarDocs} />} />
                <Route path="tabs" element={<MdxWrapper Component={TabsDocs} />} />
                <Route path="textarea" element={<MdxWrapper Component={TextareaDocs} />} />
                <Route path="popover" element={<MdxWrapper Component={PopoverDocs} />} />
                <Route path="tooltip" element={<MdxWrapper Component={TooltipDocs} />} />
                <Route path="dock" element={<MdxWrapper Component={DockDocs} />} />
                <Route path="toast" element={<MdxWrapper Component={ToastDocs} />} />
                <Route path="system-logs" element={<MdxWrapper Component={SystemLogsDocs} />} />
                <Route path="float-action-menu" element={<MdxWrapper Component={FloatActionMenuDocs} />} />
              </Route>

              <Route path="/charts" element={<ChartsLayout />}>
                <Route index element={<MdxWrapper Component={ChartsDocs} />} />
                <Route path="area-chart" element={<MdxWrapper Component={AreaChartDocs} />} />
                <Route path="bar-chart" element={<MdxWrapper Component={BarChartDocs} />} />
                <Route path="line-chart" element={<MdxWrapper Component={LineChartDocs} />} />
                <Route path="pie-chart" element={<MdxWrapper Component={PieChartDocs} />} />
              </Route>

              <Route path="/examples">
                <Route index element={<ExamplesList />} />
                <Route path="login" element={<LoginExample />} />
                <Route path="complex-form" element={<ComplexFormExample />} />
                <Route path="dashboard" element={<DashboardExample />} />
                <Route path="sidebar-dashboard" element={<SidebarDashboardExample />} />
                <Route path="all-components" element={<AllComponentsExample />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
)


