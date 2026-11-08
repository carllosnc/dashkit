export type BaseColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'taupe'
  | 'mauve'
  | 'mist'
  | 'olive';

export type PrimaryColor =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

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
  { id: 'slate', label: 'Slate', color: '#64748b' },
  { id: 'gray', label: 'Gray', color: '#6b7280' },
  { id: 'zinc', label: 'Zinc', color: '#71717a' },
  { id: 'neutral', label: 'Neutral', color: '#737373' },
  { id: 'stone', label: 'Stone', color: '#78716c' },
  { id: 'taupe', label: 'Taupe', color: '#7c6d67' },
  { id: 'mauve', label: 'Mauve', color: '#79697b' },
  { id: 'mist', label: 'Mist', color: '#67787c' },
  { id: 'olive', label: 'Olive', color: '#7c7c67' },
];

export const PRIMARY_COLORS: ColorOption<PrimaryColor>[] = [
  { id: 'red', label: 'Red', color: '#dc2626' },
  { id: 'orange', label: 'Orange', color: '#ea580c' },
  { id: 'amber', label: 'Amber', color: '#d97706' },
  { id: 'yellow', label: 'Yellow', color: '#ca8a04' },
  { id: 'lime', label: 'Lime', color: '#65a30d' },
  { id: 'green', label: 'Green', color: '#16a34a' },
  { id: 'emerald', label: 'Emerald', color: '#059669' },
  { id: 'teal', label: 'Teal', color: '#0d9488' },
  { id: 'cyan', label: 'Cyan', color: '#0891b2' },
  { id: 'sky', label: 'Sky', color: '#0284c7' },
  { id: 'blue', label: 'Blue', color: '#2563eb' },
  { id: 'indigo', label: 'Indigo', color: '#4f46e5' },
  { id: 'violet', label: 'Violet', color: '#7c3aed' },
  { id: 'purple', label: 'Purple', color: '#9333ea' },
  { id: 'fuchsia', label: 'Fuchsia', color: '#c026d3' },
  { id: 'pink', label: 'Pink', color: '#db2777' },
  { id: 'rose', label: 'Rose', color: '#e11d48' },
];

export const DARK_BG_OPTIONS: DarkBgOption[] = [
  { id: 'midnight', label: 'Midnight', description: 'Deep graphite dark mode' },
  { id: 'oled', label: 'OLED', description: 'Pure black #000000' },
];
