import { FiGithub, FiLayers } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export function DocsLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          <FiLayers className="text-neutral-900 dark:text-white" />
          Dashkit UI
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/docs/button" className="text-sm font-medium text-neutral-900 dark:text-white transition-colors">
            Documentation
          </Link>
          <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Components
          </Link>
          <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <FiGithub size={20} />
          </a>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 grid grid-cols-[240px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="py-12 border-r border-neutral-200 dark:border-neutral-800 hidden md:block pr-6">
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Components
            </h4>
            <div className="flex flex-col gap-1">
              <Link 
                to="/docs/button" 
                className={clsx(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  currentPath === '/docs/button' 
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white" 
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900/50"
                )}
              >
                Button
              </Link>
              <span className="px-3 py-2 rounded-md text-sm font-medium text-neutral-400 dark:text-neutral-600 cursor-not-allowed">
                Input (WIP)
              </span>
              <span className="px-3 py-2 rounded-md text-sm font-medium text-neutral-400 dark:text-neutral-600 cursor-not-allowed">
                Card (WIP)
              </span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
