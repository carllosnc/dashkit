import { useEffect, useState, type ReactNode } from 'react';
import {
  ThemeContext,
  type Theme,
  type BaseColor,
  type PrimaryColor,
  type DarkBackground,
} from './ThemeContext';

/**
 * Disables CSS transitions globally for a single tick during theme / palette switches.
 * This prevents the jarring white/black flickering caused by elements transitioning
 * at different speeds (e.g. text changing instantly while backgrounds slowly interpolate).
 */
function disableTransitions() {
  if (typeof window === 'undefined') return () => {};
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force a computed layout flush to commit the theme changes without transition
    (() => window.getComputedStyle(document.body).opacity)();

    setTimeout(() => {
      if (document.head.contains(css)) {
        document.head.removeChild(css);
      }
    }, 1);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [baseColor, setBaseColorState] = useState<BaseColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-base-color') as BaseColor;
      if (saved) return saved;
    }
    return 'zinc';
  });

  const [primaryColor, setPrimaryColorState] = useState<PrimaryColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-primary-color') as PrimaryColor;
      if (saved) return saved;
    }
    return 'blue';
  });

  const [darkBg, setDarkBgState] = useState<DarkBackground>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashkit-dark-bg') as DarkBackground;
      if (saved) return saved;
    }
    return 'midnight';
  });

  const setBaseColor = (base: BaseColor) => {
    const restore = disableTransitions();
    setBaseColorState(base);
    const root = window.document.documentElement;
    root.setAttribute('data-base', base);
    localStorage.setItem('dashkit-base-color', base);
    restore();
  };

  const setPrimaryColor = (primary: PrimaryColor) => {
    const restore = disableTransitions();
    setPrimaryColorState(primary);
    const root = window.document.documentElement;
    root.setAttribute('data-primary', primary);
    localStorage.setItem('dashkit-primary-color', primary);
    restore();
  };

  const setDarkBg = (bg: DarkBackground) => {
    const restore = disableTransitions();
    setDarkBgState(bg);
    const root = window.document.documentElement;
    root.setAttribute('data-dark-bg', bg);
    localStorage.setItem('dashkit-dark-bg', bg);
    restore();
  };

  const toggleTheme = () => {
    const restore = disableTransitions();
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      const root = window.document.documentElement;
      if (next === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', next);
      return next;
    });
    restore();
  };

  // Synchronize on mount
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-base', baseColor);
    root.setAttribute('data-primary', primaryColor);
    root.setAttribute('data-dark-bg', darkBg);
  }, []);

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
