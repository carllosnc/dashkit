import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-neutral-50/50 dark:bg-neutral-900/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm text-muted-foreground">
            Dashkit - Coded and designed by Carlos Costa
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a 
            href="https://github.com/carllosnc/dashkit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/docs/introduction"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/charts"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            Charts
          </Link>
          <span className="text-xs text-neutral-300 dark:text-neutral-700 select-none">|</span>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Dashkit UI.
          </p>
        </div>
      </div>
    </footer>
  );
}


