import { useTheme } from './ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import clsx from 'clsx';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}
