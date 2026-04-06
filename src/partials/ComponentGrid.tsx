import { Link } from 'react-router-dom';
import {
  FiSquare, FiCircle,
  FiType, FiTag, FiCheckSquare, FiDisc, FiList,
  FiSearch, FiToggleRight, FiMinus, FiColumns, FiLock, FiMaximize2,
  FiSidebar, FiMaximize, FiLayers, FiBell, FiMoreVertical, FiAward,
  FiInbox, FiChevronRight, FiGrid, FiLayout, FiLoader, FiSliders, FiMoreHorizontal, FiCalendar, FiTable, FiUser, FiActivity,
  FiMonitor, FiMessageCircle, FiAlignLeft, FiEdit3, FiTrendingUp, FiTerminal, FiBarChart2, FiPieChart,
  FiPlusSquare, FiDroplet, FiClock, FiPlusCircle, FiCompass, FiChevronsRight, FiChevronsDown, FiTarget, FiCheck, FiHelpCircle
} from 'react-icons/fi';

const components = [
  { to: '/docs/accordion', label: 'Accordion', icon: <FiPlusSquare size={24} />, description: 'Expandable content sections.' },
  { to: '/docs/animate-number', label: 'Animate Number', icon: <FiTrendingUp size={24} />, description: 'Smoothly transition numeric values.' },
  { to: '/charts/area-chart', label: 'Area Chart', icon: <FiActivity size={24} />, description: 'Visual area data representations.' },
  { to: '/docs/avatar', label: 'Avatar', icon: <FiUser size={24} />, description: 'Visual representation of a user.' },
  { to: '/docs/backdrop', label: 'Backdrop', icon: <FiLayers size={24} />, description: 'Dim the background for focus.' },
  { to: '/docs/badge', label: 'Badge', icon: <FiAward size={24} />, description: 'Small status descriptors.' },
  { to: '/charts/bar-chart', label: 'Bar Chart', icon: <FiBarChart2 size={24} />, description: 'Vertical or horizontal bar data.' },
  { to: '/docs/breadcrumb', label: 'Breadcrumb', icon: <FiChevronRight size={24} />, description: 'Navigation path indicators.' },
  { to: '/docs/button', label: 'Button', icon: <FiSquare size={24} />, description: 'Interactive action triggers.' },
  { to: '/docs/button-group', label: 'Button Group', icon: <FiMoreHorizontal size={24} />, description: 'Grouped related actions.' },
  { to: '/docs/card', label: 'Card', icon: <FiInbox size={24} />, description: 'Content container with styles.' },
  { to: '/docs/checkbox', label: 'Checkbox', icon: <FiCheckSquare size={24} />, description: 'Multi-select input toggle.' },
  { to: '/docs/chip', label: 'Chip', icon: <FiTag size={24} />, description: 'Compact interactive elements.' },
  { to: '/docs/circular-progress', label: 'Circular Progress', icon: <FiDisc size={24} />, description: 'Round progress indicators.' },
  { to: '/docs/color-picker', label: 'Color Picker', icon: <FiDroplet size={24} />, description: 'Standardized color selection.' },
  { to: '/docs/combobox', label: 'Combobox', icon: <FiSearch size={24} />, description: 'Select with search capability.' },
  { to: '/docs/date-field', label: 'Date Field', icon: <FiClock size={24} />, description: 'Structured date input.' },
  { to: '/docs/datepicker', label: 'Date Picker', icon: <FiCalendar size={24} />, description: 'Calendar-based date selection.' },
  { to: '/docs/divider', label: 'Divider', icon: <FiMinus size={24} />, description: 'Visual separator for content.' },
  { to: '/docs/dock', label: 'Dock', icon: <FiMonitor size={24} />, description: 'Mac-style application dock.' },
  { to: '/docs/drawer', label: 'Drawer', icon: <FiSidebar size={24} />, description: 'Sliding side panels.' },
  { to: '/docs/dropdown-menu', label: 'Dropdown Menu', icon: <FiMoreVertical size={24} />, description: 'Toggleable menu lists.' },
  { to: '/docs/float-action-menu', label: 'Float Action Menu', icon: <FiPlusCircle size={24} />, description: 'Floating action buttons.' },
  { to: '/docs/icon-button', label: 'Icon Button', icon: <FiCircle size={24} />, description: 'Compact button with icons.' },
  { to: '/docs/image-expander', label: 'Image Expander', icon: <FiMaximize2 size={24} />, description: 'Expandable image thumbnails.' },
  { to: '/docs/input', label: 'Input', icon: <FiType size={24} />, description: 'Standard text data entry.' },
  { to: '/charts/line-chart', label: 'Line Chart', icon: <FiActivity size={24} />, description: 'Linear data progression tracking.' },
  { to: '/docs/modal', label: 'Modal', icon: <FiMaximize size={24} />, description: 'Overlay dialog windows.' },
  { to: '/docs/navbar', label: 'Navbar', icon: <FiLayout size={24} />, description: 'Top-level navigation bar.' },
  { to: '/docs/navigation-menu', label: 'Navigation Menu', icon: <FiCompass size={24} />, description: 'Advanced site navigation.' },
  { to: '/docs/otp-input', label: 'OTP Input', icon: <FiLock size={24} />, description: 'Secure one-time password entry.' },
  { to: '/docs/pagination', label: 'Pagination', icon: <FiChevronsRight size={24} />, description: 'Multi-page navigation controls.' },
  { to: '/charts/pie-chart', label: 'Pie Chart', icon: <FiPieChart size={24} />, description: 'Circular proportional data charts.' },
  { to: '/docs/popover', label: 'Popover', icon: <FiMessageCircle size={24} />, description: 'Floating contextual content.' },
  { to: '/docs/progressbar', label: 'Progress Bar', icon: <FiActivity size={24} />, description: 'Linear task completion trackers.' },
  { to: '/docs/radio', label: 'Radio', icon: <FiTarget size={24} />, description: 'Single-select input options.' },
  { to: '/docs/select', label: 'Select', icon: <FiList size={24} />, description: 'Standard dropdown selection.' },
  { to: '/docs/scroll-area', label: 'Scroll Area', icon: <FiChevronsDown size={24} />, description: 'Custom theme-aware scrollbars.' },
  { to: '/docs/sidebar', label: 'Sidebar', icon: <FiAlignLeft size={24} />, description: 'Vertical navigation panels.' },
  { to: '/docs/skeleton', label: 'Skeleton', icon: <FiGrid size={24} />, description: 'Content loading placeholders.' },
  { to: '/docs/slider', label: 'Slider', icon: <FiSliders size={24} />, description: 'Range selection controls.' },
  { to: '/docs/spinner', label: 'Spinner', icon: <FiLoader size={24} />, description: 'Loading state indicators.' },
  { to: '/docs/stats-card', label: 'Stats Card', icon: <FiActivity size={24} />, description: 'Key metrics and data trends.' },
  { to: '/docs/stepper', label: 'Stepper', icon: <FiCheck size={24} />, description: 'Step-by-step process guides.' },
  { to: '/docs/surface', label: 'Surface', icon: <FiLayers size={24} />, description: 'Layered background containers.' },
  { to: '/docs/switch', label: 'Switch', icon: <FiToggleRight size={24} />, description: 'Toggle switch inputs.' },
  { to: '/docs/system-logs', label: 'System Logs', icon: <FiTerminal size={24} />, description: 'Visual console output logs.' },
  { to: '/docs/table', label: 'Table', icon: <FiTable size={24} />, description: 'Data-driven grid displays.' },
  { to: '/docs/tabs', label: 'Tabs', icon: <FiColumns size={24} />, description: 'Tabbed content switching.' },
  { to: '/docs/textarea', label: 'Textarea', icon: <FiEdit3 size={24} />, description: 'Multi-line text input fields.' },
  { to: '/docs/toast', label: 'Toast', icon: <FiBell size={24} />, description: 'Temporary notification alerts.' },
  { to: '/docs/tooltip', label: 'Tooltip', icon: <FiHelpCircle size={24} />, description: 'Hover-based information bars.' },
];

export const ComponentGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((component) => (
        <Link
          key={component.to}
          to={component.to}
          className="p-4 rounded-md bg-ds-0 shadow-sm dark:bg-ds-900 flex flex-col gap-10 no-underline group"
        >
          <div className="w-10 h-10 rounded-sm bg-ds-100 dark:bg-white/5 flex items-center justify-center text-ds-600 dark:text-ds-400">
            {component.icon}
          </div>
          <div className="flex flex-col gap-0">
            <h3 className="text-base font-semibold text-ds-900 dark:text-white">
              {component.label}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {component.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
