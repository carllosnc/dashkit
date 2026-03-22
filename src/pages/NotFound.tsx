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

      <main className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="flex flex-col gap-[40px]">
          <img src="/logo.svg" alt="Dashkit UI Logo" className="h-10 dark:invert" />

          <div className="flex flex-col gap-[10px]">
            <h1 className="text-3xl font-bold tracking-tight text-base-950 dark:text-white">
              Page not found
            </h1>
            <p className="text-base-500 dark:text-base-400 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved to a new location.
            </p>
          </div>

          <Link to="/">
            <Button variant="filled" leftIcon={<FiArrowLeft />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
