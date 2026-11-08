import { useTheme } from './ThemeContext';
import { IconButton } from '../dashkit/IconButton/IconButton';
import { FiSun, FiMoon } from 'react-icons/fi';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'sm' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      size={size}
      icon={theme === 'light' ? <FiMoon size={size === 'sm' ? 16 : 20} /> : <FiSun size={size === 'sm' ? 16 : 20} />}
      variant="soft"
      aria-label="Toggle theme"
      className={className}
    />
  );
}
