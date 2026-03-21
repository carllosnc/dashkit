import { useState } from 'react';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from '../components/Navbar/Navbar';
import { IconButton } from '../components/IconButton/IconButton';
import { FiGithub, FiMenu } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { Drawer } from '../components/Drawer/Drawer';
import clsx from 'clsx';

const navItems = [
  {
    title: 'Getting Started',
    links: [
      { to: '/docs/introduction', label: 'Introduction' },
      { to: '/docs/cli', label: 'Installation' },
    ]
  },
  {
    title: 'Components',
    links: [
      { to: '/docs/button', label: 'Button' },
      { to: '/docs/icon-button', label: 'Icon Button' },
      { to: '/docs/input', label: 'Input' },
      { to: '/docs/textarea', label: 'Textarea' },
      { to: '/docs/chip', label: 'Chip' },
      { to: '/docs/checkbox', label: 'Checkbox' },
      { to: '/docs/radio', label: 'Radio' },
      { to: '/docs/select', label: 'Select' },
      { to: '/docs/combobox', label: 'Combobox' },
      { to: '/docs/switch', label: 'Switch' },
      { to: '/docs/divider', label: 'Divider' },
      { to: '/docs/tabs', label: 'Tabs' },
      { to: '/docs/otp-input', label: 'OTP Input' },
      { to: '/docs/image-expander', label: 'Image Expander' },
      { to: '/docs/drawer', label: 'Drawer' },
      { to: '/docs/modal', label: 'Modal' },
      { to: '/docs/accordion', label: 'Accordion' },
      { to: '/docs/toast', label: 'Toast' },
      { to: '/docs/dropdown-menu', label: 'Dropdown Menu' },
      { to: '/docs/badge', label: 'Badge' },
      { to: '/docs/card', label: 'Card' },
      { to: '/docs/breadcrumb', label: 'Breadcrumb' },
      { to: '/docs/skeleton', label: 'Skeleton' },
      { to: '/docs/navbar', label: 'Navbar' },
      { to: '/docs/spinner', label: 'Spinner' },
    ]
  }
];

function SidebarContent({ currentPath, onItemClick }: { currentPath: string, onItemClick?: () => void }) {
  return (
    <>
      {navItems.map((section, idx) => (
        <div key={idx} className="mb-10 last:mb-0">
          <h4 className="text-[11px] font-bold text-base-400 dark:text-base-500 uppercase tracking-[0.2em] mb-4">
            {section.title}
          </h4>
          <nav className="flex flex-col gap-1">
            {section.links.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={onItemClick}
                className={clsx(
                  "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  (currentPath === link.to || (link.to === '/docs/introduction' && currentPath === '/docs'))
                    ? "bg-base-100 text-base-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-base-500 hover:text-base-900 hover:bg-base-50 dark:text-base-400 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
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
    <div className="min-h-screen bg-base-bg dark:bg-base-dark-bg font-sans flex flex-col">
      {/* Navigation */}
      <Navbar>
        <NavbarBrand>
          <IconButton 
            icon={<FiMenu size={20} />} 
            onClick={() => setIsMobileMenuOpen(true)}
            variant="ghost"
            className="md:hidden text-base-500 dark:text-base-400"
          />
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />
          </Link>
        </NavbarBrand>
        
        <NavbarLinks>
          <Link to="/docs" className="text-sm font-medium text-base-950 dark:text-white">Documentation</Link>
          <Link to="/examples" className="text-sm font-medium text-base-500 dark:text-base-400 hover:text-base-950 dark:hover:text-white transition-colors">Examples</Link>
        </NavbarLinks>

        <NavbarActions>
          <div className="flex items-center gap-4 pl-0 sm:pl-4 sm:border-l border-base-border dark:border-base-dark-border">
            <ThemeToggle />
            <IconButton 
              icon={<FiGithub size={20} />} 
              href="https://github.com/carllosnc/dashkit" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="ghost"
              className="text-base-400 hover:text-base-900 dark:hover:text-white"
            />
          </div>
        </NavbarActions>
      </Navbar>

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
        <aside className="py-12 border-r border-base-border dark:border-base-dark-border hidden md:block shrink-0">
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
