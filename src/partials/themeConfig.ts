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
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'indigo', label: 'Indigo', color: '#6366f1' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
  { id: 'green', label: 'Green', color: '#22c55e' },
  { id: 'rose', label: 'Rose', color: '#f43f5e' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'amber', label: 'Amber', color: '#f59e0b' },
  { id: 'cyan', label: 'Cyan', color: '#06b6d4' },
  { id: 'teal', label: 'Teal', color: '#14b8a6' },
  { id: 'fuchsia', label: 'Fuchsia', color: '#d946ef' },
];

export const DARK_BG_OPTIONS: DarkBgOption[] = [
  { id: 'midnight', label: 'Midnight', description: 'Deep graphite dark mode' },
  { id: 'oled', label: 'OLED', description: 'Pure black #000000' },
];
