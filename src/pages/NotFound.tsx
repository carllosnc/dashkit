import { Button } from '../components/Button/Button';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <div className="flex flex-col min-h-screen ds-page font-sans">
      <Helmet>
        <title>404 - Page Not Found | Dashkit UI</title>
      </Helmet>
      
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-base-100/50 dark:bg-base-900/10 blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-base-100/30 dark:bg-base-800/10 blur-[100px]" />
      </div>

      <nav className="flex items-center justify-between px-8 py-5 border-b border-layout-border dark:border-layout-dark-border bg-base-bg/70 dark:bg-base-dark-bg/70 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="flex items-center group">
          <img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />
        </Link>
      </nav>

      <main className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-base-950 dark:text-white mb-6">
            Page not found
          </h1>
          <p className="text-base-500 dark:text-base-400 max-w-md mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
          <Link to="/">
            <Button variant="filled" leftIcon={<FiArrowLeft />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-8 border-t border-layout-border dark:border-layout-dark-border text-center">
        <p className="text-xs text-base-400">© 2026 Dashkit UI. All rights reserved.</p>
      </footer>
    </div>
  );
}
