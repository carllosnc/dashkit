import { useTheme } from './ThemeContext';
import { IconButton } from '../components/dashkit/IconButton/IconButton';
import { FiSun, FiMoon } from 'react-icons/fi';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      icon={theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
      variant="soft"
      aria-label="Toggle theme"
      className={className}
    />
  );
}


