import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from '../components/Navbar/Navbar';
import { IconButton } from '../components/IconButton/IconButton';
import { ThemeToggle } from './ThemeToggle';
import { FiGithub, FiMenu } from 'react-icons/fi';
import clsx from 'clsx';

interface HeaderProps {
  onMenuClick?: () => void;
  showNavLinks?: boolean;
}

export function Header({ onMenuClick, showNavLinks = true }: HeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Navbar>
      <NavbarBrand>
        {onMenuClick && (
          <IconButton
            icon={<FiMenu size={20} />}
            onClick={onMenuClick}
            variant="ghost"
            className="md:hidden text-base-500 dark:text-base-400 mr-2"
          />
        )}
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />
        </Link>
      </NavbarBrand>

      {showNavLinks && (
        <NavbarLinks>
          <Link 
            to="/docs" 
            className={clsx(
              "text-sm font-medium transition-colors",
              currentPath.startsWith('/docs') ? "text-base-950 dark:text-white" : "text-base-500 dark:text-base-400 hover:text-base-950 dark:hover:text-white"
            )}
          >
            Documentation
          </Link>
          <Link 
            to="/charts" 
            className={clsx(
              "text-sm font-medium transition-colors",
              currentPath.startsWith('/charts') ? "text-base-950 dark:text-white" : "text-base-500 dark:text-base-400 hover:text-base-950 dark:hover:text-white"
            )}
          >
            Charts
          </Link>
          <Link 
            to="/examples" 
            className={clsx(
              "text-sm font-medium transition-colors",
              currentPath.startsWith('/examples') ? "text-base-950 dark:text-white" : "text-base-500 dark:text-base-400 hover:text-base-950 dark:hover:text-white"
            )}
          >
            Examples
          </Link>
        </NavbarLinks>
      )}

      <NavbarActions>
        <ThemeToggle />
        <IconButton
          icon={<FiGithub size={20} />}
          href="https://github.com/carllosnc/dashkit"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          className="text-base-400 hover:text-base-900 dark:hover:text-white"
        />
      </NavbarActions>
    </Navbar>
  );
}
