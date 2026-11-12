import { createContext, useContext } from 'react';
import type { BaseColor, PrimaryColor, DarkBackground, ThemePreset } from './themeConfig';

export type Theme = 'light' | 'dark';
export type { BaseColor, PrimaryColor, DarkBackground, ThemePreset };

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  baseColor: BaseColor;
  setBaseColor: (base: BaseColor) => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (primary: PrimaryColor) => void;
  darkBg: DarkBackground;
  setDarkBg: (bg: DarkBackground) => void;
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
