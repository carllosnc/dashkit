import { useState } from 'react';
import {
  FiActivity, FiPieChart, FiBarChart2, FiTrendingUp,
  FiGrid as FiGridIcon
} from 'react-icons/fi';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Drawer, DrawerHeader } from '../dashkit/Drawer/Drawer';
import { Sidebar, type SidebarSection } from '../partials/Sidebar';

const chartNavItems: SidebarSection[] = [
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



export function ChartsLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
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
          <h2 className="text-xl font-bold text-foreground tracking-tight">
             Charts Gallery
          </h2>
        </DrawerHeader>
        <div className="py-4 px-6 overflow-y-auto overscroll-contain">
          <Sidebar 
            sections={chartNavItems} 
            currentPath={currentPath}
            onItemClick={() => setIsMobileMenuOpen(false)}
            layoutId="charts-sidebar-active"
          />
        </div>
      </Drawer>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 flex md:grid md:grid-cols-[260px_minmax(0,1fr)] gap-0 md:gap-12">
        {/* Sidebar */}
        <aside className="border-r border-border hidden md:block shrink-0">
          <div className="sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain py-8 pr-6 custom-scrollbar">
            <Sidebar 
              sections={chartNavItems} 
              currentPath={currentPath}
              layoutId="charts-sidebar-active"
            />
          </div>
        </aside>

        {/* Content Area */}
        <main className="py-8 md:py-12 w-full min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}


