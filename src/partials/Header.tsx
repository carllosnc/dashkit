import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from '../dashkit/Navbar';
import { IconButton } from '../dashkit/IconButton/IconButton';
import { ThemeToggle } from './ThemeToggle';
import { ThemeCustomizer } from './ThemeCustomizer';
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
            aria-label="Toggle navigation menu"
            size="sm"
            icon={<FiMenu size={18} />}
            onClick={onMenuClick}
            variant="ghost"
            className="md:hidden text-muted-foreground mr-1"
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
              currentPath.startsWith('/docs') ? "text-foreground" : "text-muted-foreground hover:text-ds-950 dark:hover:text-white"
            )}
          >
            Documentation
          </Link>
          <Link
            to="/charts"
            className={clsx(
              "text-sm font-medium transition-colors",
              currentPath.startsWith('/charts') ? "text-foreground" : "text-muted-foreground hover:text-ds-950 dark:hover:text-white"
            )}
          >
            Charts
          </Link>
          <Link
            to="/examples"
            className={clsx(
              "text-sm font-medium transition-colors",
              currentPath.startsWith('/examples') ? "text-foreground" : "text-muted-foreground hover:text-ds-950 dark:hover:text-white"
            )}
          >
            Examples
          </Link>
        </NavbarLinks>
      )}

      <NavbarActions>
        <ThemeCustomizer size="sm" />
        <ThemeToggle size="sm" />
        <IconButton
          aria-label="GitHub Repository"
          size="sm"
          icon={<FiGithub size={16} />}
          href="https://github.com/carllosnc/dashkit"
          target="_blank"
          rel="noopener noreferrer"
          variant="soft"
        />
      </NavbarActions>
    </Navbar>
  );
}
