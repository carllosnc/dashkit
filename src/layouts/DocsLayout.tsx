import { FiGithub } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import clsx from 'clsx';

export function DocsLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] font-sans flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#030303]/70 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="flex items-center group">
          <img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/docs" className="text-sm font-medium text-neutral-900 dark:text-white transition-colors">
            Documentation
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
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 grid grid-cols-[260px_1fr] gap-12">
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
                <Link 
                  to="/docs/cli" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/cli'
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  CLI
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
                <Link 
                  to="/docs/input" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/input' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Input
                </Link>
                <Link 
                  to="/docs/checkbox" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/checkbox' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Checkbox
                </Link>
                <Link 
                  to="/docs/radio" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/radio' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Radio
                </Link>
                <Link 
                  to="/docs/select" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/select' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Select
                </Link>
                <Link 
                  to="/docs/switch" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/switch' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Switch
                </Link>
                <Link 
                  to="/docs/tabs" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/tabs' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Tabs
                </Link>
                <Link 
                  to="/docs/otp-input" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/otp-input' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  OTP Input
                </Link>
                <Link 
                  to="/docs/image-expander" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/image-expander' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Image Expander
                </Link>
                <Link 
                  to="/docs/drawer" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/drawer' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Drawer
                </Link>
                <Link 
                  to="/docs/modal" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/modal' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Modal
                </Link>
                <Link 
                  to="/docs/accordion" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/accordion' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Accordion
                </Link>
                <Link 
                  to="/docs/toast" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/toast' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Toast
                </Link>
                <Link 
                  to="/docs/dropdown-menu" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/dropdown-menu' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Dropdown Menu
                </Link>
                <Link 
                  to="/docs/badge" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/badge' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Badge
                </Link>
                <Link 
                  to="/docs/card" 
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPath === '/docs/card' 
                      ? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  Card
                </Link>
              </nav>
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
