export type BaseColor = 'zinc' | 'slate' | 'gray' | 'neutral' | 'stone';

export type PrimaryColor =
  | 'blue'
  | 'violet'
  | 'indigo'
  | 'emerald'
  | 'green'
  | 'rose'
  | 'orange'
  | 'amber'
  | 'cyan'
  | 'teal'
  | 'fuchsia';

export type DarkBackground = 'midnight' | 'oled';

export interface ColorOption<T extends string> {
  id: T;
  label: string;
  color: string;
}

export interface DarkBgOption {
  id: DarkBackground;
  label: string;
  description: string;
}

export const BASE_COLORS: ColorOption<BaseColor>[] = [
  { id: 'zinc', label: 'Zinc', color: '#71717a' },
  { id: 'slate', label: 'Slate', color: '#64748b' },
  { id: 'gray', label: 'Gray', color: '#6b7280' },
  { id: 'neutral', label: 'Neutral', color: '#737373' },
  { id: 'stone', label: 'Stone', color: '#78716c' },
];

export const PRIMARY_COLORS: ColorOption<PrimaryColor>[] = [
  { id: 'blue', label: 'Blue', color: '#2563eb' },
  { id: 'violet', label: 'Violet', color: '#7c3aed' },
  { id: 'indigo', label: 'Indigo', color: '#4f46e5' },
  { id: 'emerald', label: 'Emerald', color: '#059669' },
  { id: 'green', label: 'Green', color: '#16a34a' },
  { id: 'rose', label: 'Rose', color: '#e11d48' },
  { id: 'orange', label: 'Orange', color: '#ea580c' },
  { id: 'amber', label: 'Amber', color: '#d97706' },
  { id: 'cyan', label: 'Cyan', color: '#0891b2' },
  { id: 'teal', label: 'Teal', color: '#0d9488' },
  { id: 'fuchsia', label: 'Fuchsia', color: '#c026d3' },
];

export const DARK_BG_OPTIONS: DarkBgOption[] = [
  { id: 'midnight', label: 'Midnight', description: 'Deep graphite dark mode' },
  { id: 'oled', label: 'OLED', description: 'Pure black #000000' },
];
