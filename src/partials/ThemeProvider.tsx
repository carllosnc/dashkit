import { useEffect, useState, type ReactNode } from 'react';
import {
  ThemeContext,
  type Theme,
  type BaseColor,
  type PrimaryColor,
  type DarkBackground,
} from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [baseColor, setBaseColor] = useState<BaseColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-base-color') as BaseColor;
      if (saved) return saved;
    }
    return 'zinc';
  });

  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-primary-color') as PrimaryColor;
      if (saved) return saved;
    }
    return 'blue';
  });

  const [darkBg, setDarkBg] = useState<DarkBackground>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-dark-bg') as DarkBackground;
      if (saved) return saved;
    }
    return 'midnight';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-base', baseColor);
    localStorage.setItem('dashkit-base-color', baseColor);
  }, [baseColor]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-primary', primaryColor);
    localStorage.setItem('dashkit-primary-color', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-dark-bg', darkBg);
    localStorage.setItem('dashkit-dark-bg', darkBg);
  }, [darkBg]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        baseColor,
        setBaseColor,
        primaryColor,
        setPrimaryColor,
        darkBg,
        setDarkBg,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
