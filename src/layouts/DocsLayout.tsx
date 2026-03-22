import { useState } from 'react';
import {
  FiBookOpen, FiDownload, FiSquare, FiCircle,
  FiType, FiMessageSquare, FiTag, FiCheckSquare, FiDisc, FiList,
  FiSearch, FiToggleRight, FiMinus, FiColumns, FiLock, FiMaximize2,
  FiSidebar, FiMaximize, FiLayers, FiBell, FiMoreVertical, FiAward,
  FiInbox, FiChevronRight, FiGrid, FiLayout, FiLoader, FiSliders, FiMoreHorizontal
} from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Drawer } from '../components/Drawer/Drawer';
import clsx from 'clsx';

const navItems = [
  {
    title: 'Getting Started',
    links: [
      { to: '/docs/introduction', label: 'Introduction', icon: <FiBookOpen size={16} /> },
      { to: '/docs/cli', label: 'Installation', icon: <FiDownload size={16} /> },
      { to: '/docs/customization', label: 'Customization', icon: <FiSliders size={16} /> },
    ]
  },
  {
    title: 'Components',
    links: [
      { to: '/docs/button', label: 'Button', icon: <FiSquare size={16} /> },
      { to: '/docs/button-group', label: 'Button Group', icon: <FiMoreHorizontal size={16} /> },
      { to: '/docs/icon-button', label: 'Icon Button', icon: <FiCircle size={16} /> },
      { to: '/docs/input', label: 'Input', icon: <FiType size={16} /> },
      { to: '/docs/textarea', label: 'Textarea', icon: <FiMessageSquare size={16} /> },
      { to: '/docs/chip', label: 'Chip', icon: <FiTag size={16} /> },
      { to: '/docs/checkbox', label: 'Checkbox', icon: <FiCheckSquare size={16} /> },
      { to: '/docs/radio', label: 'Radio', icon: <FiDisc size={16} /> },
      { to: '/docs/select', label: 'Select', icon: <FiList size={16} /> },
      { to: '/docs/combobox', label: 'Combobox', icon: <FiSearch size={16} /> },
      { to: '/docs/switch', label: 'Switch', icon: <FiToggleRight size={16} /> },
      { to: '/docs/divider', label: 'Divider', icon: <FiMinus size={16} /> },
      { to: '/docs/tabs', label: 'Tabs', icon: <FiColumns size={16} /> },
      { to: '/docs/otp-input', label: 'OTP Input', icon: <FiLock size={16} /> },
      { to: '/docs/image-expander', label: 'Image Expander', icon: <FiMaximize2 size={16} /> },
      { to: '/docs/drawer', label: 'Drawer', icon: <FiSidebar size={16} /> },
      { to: '/docs/modal', label: 'Modal', icon: <FiMaximize size={16} /> },
      { to: '/docs/accordion', label: 'Accordion', icon: <FiLayers size={16} /> },
      { to: '/docs/toast', label: 'Toast', icon: <FiBell size={16} /> },
      { to: '/docs/dropdown-menu', label: 'Dropdown Menu', icon: <FiMoreVertical size={16} /> },
      { to: '/docs/badge', label: 'Badge', icon: <FiAward size={16} /> },
      { to: '/docs/card', label: 'Card', icon: <FiInbox size={16} /> },
      { to: '/docs/breadcrumb', label: 'Breadcrumb', icon: <FiChevronRight size={16} /> },
      { to: '/docs/skeleton', label: 'Skeleton', icon: <FiGrid size={16} /> },
      { to: '/docs/navbar', label: 'Navbar', icon: <FiLayout size={16} /> },
      { to: '/docs/spinner', label: 'Spinner', icon: <FiLoader size={16} /> },
    ]
  },
];

function SidebarContent({ currentPath, onItemClick }: { currentPath: string, onItemClick?: () => void }) {
  return (
    <>
      {navItems.map((section, idx) => (
        <div key={idx} className="mb-10 last:mb-0">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {section.title}
          </h4>
          <nav className="flex flex-col gap-1">
            {section.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onItemClick}
                className={clsx(
                  "px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-3",
                  (currentPath === link.to || (link.to === '/docs/introduction' && currentPath === '/docs'))
                    ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-white text-neutral-950 font-semibold dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-neutral-500 font-medium hover:text-neutral-950 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                <div className={clsx(
                  "shrink-0 transition-colors duration-200",
                  (currentPath === link.to || (link.to === '/docs/introduction' && currentPath === '/docs'))
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-white"
                )}>
                  {link.icon}
                </div>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </>
  );
}

export function DocsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
        title="Documentation"
        size="w-[80%] max-w-[300px]"
      >
        <div className="py-4">
          <SidebarContent
            currentPath={currentPath}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </Drawer>

      {/* Main Layout */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 flex md:grid md:grid-cols-[260px_1fr] gap-0 md:gap-12">
        {/* Sidebar */}
        <aside className="py-12 border-r border-border hidden md:block shrink-0">
          <div className="sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-8 custom-scrollbar">
            <SidebarContent currentPath={currentPath} />
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


