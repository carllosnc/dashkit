import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-ds-50/50 dark:bg-ds-900/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-[13px] md:text-sm text-muted-foreground text-center md:text-left">
            Dashkit - Coded and designed by{' '}
            <a 
              href="https://github.com/carllosnc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-ds-600 hover:text-ds-900 dark:text-ds-400 dark:hover:text-ds-200 transition-colors"
            >
              Carlos Costa
            </a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-6 text-[13px] md:text-sm">
            <a 
              href="https://github.com/carllosnc/dashkit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <Link
              to="/docs/introduction"
              className="font-medium text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link
              to="/charts"
              className="font-medium text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white transition-colors"
            >
              Charts
            </Link>
          </div>
          <span className="hidden md:block text-xs text-ds-300 dark:text-ds-700 select-none">|</span>
          <p className="text-[12px] md:text-sm text-ds-400 dark:text-ds-500">
            © {new Date().getFullYear()} Dashkit UI.
          </p>
        </div>
      </div>
    </footer>
  );
}


