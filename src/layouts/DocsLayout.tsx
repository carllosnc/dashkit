import { useState } from 'react';
import {
  FiBookOpen, FiDownload, FiSquare, FiCircle,
  FiType, FiTag, FiCheckSquare, FiDisc, FiList,
  FiSearch, FiToggleRight, FiMinus, FiColumns, FiLock, FiMaximize2,
  FiSidebar, FiMaximize, FiLayers, FiBell, FiMoreVertical, FiAward,
  FiInbox, FiChevronRight, FiGrid, FiLayout, FiLoader, FiSliders, FiMoreHorizontal, FiCalendar, FiTable, FiUser, FiActivity,
  FiMonitor, FiMessageCircle, FiAlignLeft, FiEdit3, FiTrendingUp, FiSettings, FiTerminal,
  FiPlusSquare, FiDroplet, FiClock, FiPlusCircle, FiCompass, FiChevronsRight, FiChevronsDown, FiTarget, FiCheck, FiHelpCircle,
  FiCopy
} from 'react-icons/fi';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Drawer, DrawerHeader } from '../components/dashkit/Drawer/Drawer';
import { Sidebar, type SidebarSection } from '../partials/Sidebar';

const navItems: SidebarSection[] = [
  {
    title: 'Getting Started',
    links: [
      { to: '/docs/introduction', label: 'Introduction', icon: <FiBookOpen size={16} /> },
      { to: '/docs/cli', label: 'Installation', icon: <FiDownload size={16} /> },
      { to: '/docs/customization', label: 'Customization', icon: <FiSettings size={16} /> },
      { to: '/docs/components', label: 'Components', icon: <FiGrid size={16} /> },
    ]
  },
  {
    title: 'Components',
    links: [
      { to: '/docs/accordion', label: 'Accordion', icon: <FiPlusSquare size={16} /> },
      { to: '/docs/animate-number', label: 'Animate Number', icon: <FiTrendingUp size={16} /> },
      { to: '/docs/avatar', label: 'Avatar', icon: <FiUser size={16} /> },
      { to: '/docs/backdrop', label: 'Backdrop', icon: <FiLayers size={16} /> },
      { to: '/docs/badge', label: 'Badge', icon: <FiAward size={16} /> },
      { to: '/docs/breadcrumb', label: 'Breadcrumb', icon: <FiChevronRight size={16} /> },
      { to: '/docs/button', label: 'Button', icon: <FiSquare size={16} /> },
      { to: '/docs/button-group', label: 'Button Group', icon: <FiMoreHorizontal size={16} /> },
      { to: '/docs/card', label: 'Card', icon: <FiInbox size={16} /> },
      { to: '/docs/checkbox', label: 'Checkbox', icon: <FiCheckSquare size={16} /> },
      { to: '/docs/chip', label: 'Chip', icon: <FiTag size={16} /> },
      { to: '/docs/circular-progress', label: 'Circular Progress', icon: <FiDisc size={16} /> },
      { to: '/docs/color-picker', label: 'Color Picker', icon: <FiDroplet size={16} /> },
      { to: '/docs/combobox', label: 'Combobox', icon: <FiSearch size={16} /> },
      { to: '/docs/copy-field', label: 'Copy Field', icon: <FiCopy size={16} /> },
      { to: '/docs/date-field', label: 'Date Field', icon: <FiClock size={16} /> },
      { to: '/docs/datepicker', label: 'Date Picker', icon: <FiCalendar size={16} /> },
      { to: '/docs/divider', label: 'Divider', icon: <FiMinus size={16} /> },
      { to: '/docs/dock', label: 'Dock', icon: <FiMonitor size={16} /> },
      { to: '/docs/drawer', label: 'Drawer', icon: <FiSidebar size={16} /> },
      { to: '/docs/dropdown-menu', label: 'Dropdown Menu', icon: <FiMoreVertical size={16} /> },
      { to: '/docs/float-action-menu', label: 'Float Action Menu', icon: <FiPlusCircle size={16} /> },
      { to: '/docs/icon-button', label: 'Icon Button', icon: <FiCircle size={16} /> },
      { to: '/docs/image-expander', label: 'Image Expander', icon: <FiMaximize2 size={16} /> },
      { to: '/docs/input', label: 'Input', icon: <FiType size={16} /> },
      { to: '/docs/modal', label: 'Modal', icon: <FiMaximize size={16} /> },
      { to: '/docs/navbar', label: 'Navbar', icon: <FiLayout size={16} /> },
      { to: '/docs/navigation-menu', label: 'Navigation Menu', icon: <FiCompass size={16} /> },
      { to: '/docs/otp-input', label: 'OTP Input', icon: <FiLock size={16} /> },
      { to: '/docs/pagination', label: 'Pagination', icon: <FiChevronsRight size={16} /> },
      { to: '/docs/popover', label: 'Popover', icon: <FiMessageCircle size={16} /> },
      { to: '/docs/progressbar', label: 'Progress Bar', icon: <FiActivity size={16} /> },
      { to: '/docs/radio', label: 'Radio', icon: <FiTarget size={16} /> },
      { to: '/docs/select', label: 'Select', icon: <FiList size={16} /> },
      { to: '/docs/scroll-area', label: 'Scroll Area', icon: <FiChevronsDown size={16} /> },
      { to: '/docs/sidebar', label: 'Sidebar', icon: <FiAlignLeft size={16} /> },
      { to: '/docs/skeleton', label: 'Skeleton', icon: <FiGrid size={16} /> },
      { to: '/docs/slider', label: 'Slider', icon: <FiSliders size={16} /> },
      { to: '/docs/spinner', label: 'Spinner', icon: <FiLoader size={16} /> },
      { to: '/docs/stats-card', label: 'Stats Card', icon: <FiActivity size={16} /> },
      { to: '/docs/stepper', label: 'Stepper', icon: <FiCheck size={16} /> },
      { to: '/docs/surface', label: 'Surface', icon: <FiLayers size={16} /> },
      { to: '/docs/switch', label: 'Switch', icon: <FiToggleRight size={16} /> },
      { to: '/docs/system-logs', label: 'System Logs', icon: <FiTerminal size={16} /> },
      { to: '/docs/table', label: 'Table', icon: <FiTable size={16} /> },
      { to: '/docs/tabs', label: 'Tabs', icon: <FiColumns size={16} /> },
      { to: '/docs/textarea', label: 'Textarea', icon: <FiEdit3 size={16} /> },
      { to: '/docs/toast', label: 'Toast', icon: <FiBell size={16} /> },
      { to: '/docs/tooltip', label: 'Tooltip', icon: <FiHelpCircle size={16} /> },
    ]
  },
];

export function DocsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Helmet>
        <title>Documentation | Dashkit UI</title>
        <meta name="description" content="Explore Dashkit UI's comprehensive documentation, component APIs, and implementation guides." />
      </Helmet>
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
        size="w-[80%] max-w-[300px]"
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold text-block-fg dark:text-block-dark-fg tracking-tight">
             Documentation
          </h2>
        </DrawerHeader>
        <div className="py-4 px-6 overflow-y-auto">
          <Sidebar
            sections={navItems}
            currentPath={currentPath}
            onItemClick={() => setIsMobileMenuOpen(false)}
            isActive={(linkTo, path) => path === linkTo || (linkTo === '/docs/introduction' && path === '/docs')}
          />
        </div>
      </Drawer>

      {/* Main Layout */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 flex md:grid md:grid-cols-[260px_1fr] gap-0 md:gap-12">
        {/* Sidebar */}
        <aside className="py-12 border-r hidden md:block shrink-0">
          <div className="sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-8 custom-scrollbar">
            <Sidebar
              sections={navItems}
              currentPath={currentPath}
              isActive={(linkTo, path) => path === linkTo || (linkTo === '/docs/introduction' && path === '/docs')}
            />
          </div>
        </aside>

        {/* Content Area */}
        <main className="py-8 md:py-12 w-full min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}


