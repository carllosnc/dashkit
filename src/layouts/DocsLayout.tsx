import { FiGithub, FiLayers } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import clsx from 'clsx';

export function DocsLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] font-sans flex flex-col selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#030303]/70 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-neutral-900 dark:text-white group">
          <div className="p-1.5 rounded-lg bg-neutral-900 dark:bg-white group-hover:scale-110">
            <FiLayers className="text-white dark:text-black size-5" />
          </div>
          Dashkit UI
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/docs" className="text-sm font-medium text-neutral-900 dark:text-white transition-colors">
            Documentation
          </Link>
          <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            Components
          </Link>
          <div className="flex items-center gap-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
            <ThemeToggle />
            <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 grid grid-cols-[260px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="py-12 border-r border-neutral-200 dark:border-neutral-800 hidden md:block pr-8">
          <div className="sticky top-28">
            <div className="mb-10">
              <h4 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">
                Getting Started
              </h4>
              <nav className="flex flex-col gap-1">
                <Link 
                  to="/docs/introduction" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    (currentPath === '/docs' || currentPath === '/docs/introduction')
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Introduction
                </Link>
              </nav>
            </div>

            <div className="mb-8">
              <h4 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">
                Components
              </h4>
              <nav className="flex flex-col gap-1">
                <Link 
                  to="/docs/button" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium",
                    currentPath === '/docs/button' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Button
                </Link>
                <div className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 dark:text-neutral-800 cursor-not-allowed italic">
                  Input (WIP)
                </div>
                <div className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 dark:text-neutral-800 cursor-not-allowed italic">
                  Card (WIP)
                </div>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="py-12 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
