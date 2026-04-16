import { useState } from 'react';
import {
  FiActivity, FiPieChart, FiBarChart2, FiTrendingUp,
  FiGrid as FiGridIcon
} from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Drawer, DrawerHeader } from '../components/dashkit/Drawer/Drawer';
import clsx from 'clsx';

interface ChartNavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

interface ChartNavSection {
  title: string;
  links: ChartNavLink[];
}

const chartNavItems: ChartNavSection[] = [
  {
    title: 'Charts Overview',
    links: [
      { to: '/charts', label: 'All Charts', icon: <FiGridIcon size={16} /> },
    ]
  },
  {
    title: 'Available Charts',
    links: [
      { to: '/charts/area-chart', label: 'Area Chart', icon: <FiActivity size={16} /> },
      { to: '/charts/bar-chart', label: 'Bar Chart', icon: <FiBarChart2 size={16} /> },
      { to: '/charts/line-chart', label: 'Line Chart', icon: <FiTrendingUp size={16} /> },
      { to: '/charts/pie-chart', label: 'Pie Chart', icon: <FiPieChart size={16} /> },
    ]
  }
];

function SidebarContent({ currentPath, onItemClick }: { currentPath: string, onItemClick?: () => void }) {
  return (
    <>
      {chartNavItems.map((section, idx) => (
        <div key={idx} className="mb-10 last:mb-0">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {section.title}
          </h4>
          <nav className="flex flex-col gap-1">
            {section.links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.disabled ? (e) => e.preventDefault() : onItemClick}
                className={clsx(
                  "px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-3",
                  currentPath === link.to
                    ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-white text-ds-950 font-semibold dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-ds-500 font-medium hover:text-ds-950 hover:bg-white/50 dark:text-ds-400 dark:hover:text-white dark:hover:bg-white/5",
                  link.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-ds-500"
                )}
              >
                <div className={clsx(
                  "shrink-0 transition-colors duration-200",
                  currentPath === link.to
                    ? "text-ds-900 dark:text-white"
                    : "text-ds-400 group-hover:text-ds-900 dark:text-ds-500 dark:group-hover:text-white"
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

export function ChartsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen ds-page font-sans flex flex-col">
      <Helmet>
        <title>Charts Showcase | Dashkit UI</title>
        <meta name="description" content="Explore Dashkit UI's interactive chart components, including Area, Bar, Line, and Pie charts optimized for dashboards." />
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
             Charts Gallery
          </h2>
        </DrawerHeader>
        <div className="py-4 px-6 overflow-y-auto">
          <SidebarContent
            currentPath={currentPath}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </Drawer>

      {/* Main Layout */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 flex md:grid md:grid-cols-[260px_1fr] gap-0 md:gap-12">
        {/* Sidebar */}
        <aside className="py-12 border-r hidden md:block shrink-0">
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


