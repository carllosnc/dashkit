import { createContext, useContext } from 'react';
import type { BaseColor, PrimaryColor } from './themeConfig';

export type Theme = 'light' | 'dark';
export type { BaseColor, PrimaryColor };

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  baseColor: BaseColor;
  setBaseColor: (base: BaseColor) => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (primary: PrimaryColor) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
