import brutalistCssRaw from '../dashkit/presets/brutalist.css?raw';
import matrixCssRaw from '../dashkit/presets/matrix.css?raw';

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

export type ThemePreset = 'default' | 'brutalist' | 'matrix';

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

export interface PresetTokenEntry {
  variable: string;
  category: 'Core & Surface' | 'Interactive' | 'Form & Geometry';
  description: string;
  lightValue: string;
  darkValue: string;
  lightPreviewColor?: string;
  darkPreviewColor?: string;
}

export interface ThemePresetOption {
  id: ThemePreset;
  label: string;
  tagline: string;
  description: string;
  baseColor: BaseColor;
  primaryColor: PrimaryColor;
  darkBg: DarkBackground;
  preferredTheme?: 'light' | 'dark';
  radius: string;
  radiusScale: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  fontLabel: string;
  surfaceLabel: string;
  accentHex: string;
  presetFile: string;
  tokens: PresetTokenEntry[];
  cssSnippet: string;
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

export const THEME_PRESETS: ThemePresetOption[] = [
  {
    id: 'default',
    label: 'Default',
    tagline: 'Clean & balanced',
    description:
      'Balanced 0.75rem geometry, Zinc neutral surfaces, Blue brand actions, and subtle depth gradients.',
    baseColor: 'zinc',
    primaryColor: 'blue',
    darkBg: 'midnight',
    radius: '0.75rem',
    radiusScale: {
      sm: '7px (calc(0.75rem - 5px))',
      md: '9px (calc(0.75rem - 3px))',
      lg: '12px (0.75rem)',
      xl: '16px (calc(0.75rem * 1.3333))',
      '2xl': '20px (calc(0.75rem * 1.6667))',
    },
    fontLabel: 'Inter Variable (Sans)',
    surfaceLabel: 'Subtle tactile gradient',
    accentHex: '#2563eb',
    presetFile: 'src/dashkit/dashkit.css',
    tokens: [
      {
        variable: '--ds-bg',
        category: 'Core & Surface',
        description: 'Main application background',
        lightValue: 'var(--color-ds-100)',
        darkValue: 'var(--color-ds-950)',
        lightPreviewColor: '#f4f4f5',
        darkPreviewColor: '#09090b',
      },
      {
        variable: '--ds-fg',
        category: 'Core & Surface',
        description: 'Main foreground text color',
        lightValue: 'var(--color-ds-800)',
        darkValue: 'var(--color-ds-100)',
        lightPreviewColor: '#27272a',
        darkPreviewColor: '#f4f4f5',
      },
      {
        variable: '--ds-card',
        category: 'Core & Surface',
        description: 'Surface color for Cards & containers',
        lightValue: 'var(--color-ds-0)',
        darkValue: 'var(--color-ds-900)',
        lightPreviewColor: '#ffffff',
        darkPreviewColor: '#18181b',
      },
      {
        variable: '--ds-border',
        category: 'Core & Surface',
        description: 'Default structural border token',
        lightValue: 'var(--color-ds-300)',
        darkValue: 'var(--color-ds-800)',
        lightPreviewColor: '#d4d4d8',
        darkPreviewColor: '#27272a',
      },
      {
        variable: '--ds-primary',
        category: 'Interactive',
        description: 'Primary brand action color',
        lightValue: 'var(--color-ds-primary-600)',
        darkValue: 'var(--color-ds-primary-500)',
        lightPreviewColor: '#2563eb',
        darkPreviewColor: '#3b82f6',
      },
      {
        variable: '--ds-secondary',
        category: 'Interactive',
        description: 'Secondary neutral action fill',
        lightValue: 'var(--color-ds-200)',
        darkValue: 'var(--color-ds-800)',
        lightPreviewColor: '#e4e4e7',
        darkPreviewColor: '#27272a',
      },
      {
        variable: '--ds-input-bg',
        category: 'Form & Geometry',
        description: 'Form control surface background',
        lightValue: 'var(--color-ds-100)',
        darkValue: 'var(--color-ds-800)',
        lightPreviewColor: '#f4f4f5',
        darkPreviewColor: '#27272a',
      },
      {
        variable: '--ds-input-border',
        category: 'Form & Geometry',
        description: 'Form control border color',
        lightValue: 'var(--color-ds-300)',
        darkValue: 'var(--color-ds-700)',
        lightPreviewColor: '#d4d4d8',
        darkPreviewColor: '#3f3f46',
      },
      {
        variable: '--radius',
        category: 'Form & Geometry',
        description: 'Master geometric corner radius',
        lightValue: '0.75rem',
        darkValue: '0.75rem',
      },
      {
        variable: '--ds-pill-radius',
        category: 'Form & Geometry',
        description: 'Pill radius for Buttons, Chips, Switches & Sliders',
        lightValue: 'calc(var(--radius) * 9999)',
        darkValue: 'calc(var(--radius) * 9999)',
      },
      {
        variable: '--ds-border-width',
        category: 'Form & Geometry',
        description: 'Structural border width for Cards, Buttons & Inputs',
        lightValue: '1px',
        darkValue: '1px',
      },
      {
        variable: '--ds-button-shadow',
        category: 'Interactive',
        description: 'Elevation / offset shadow for Button controls',
        lightValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        darkValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      {
        variable: '--ds-card-shadow',
        category: 'Core & Surface',
        description: 'Default elevation / offset shadow for Cards',
        lightValue: 'none',
        darkValue: 'none',
      },
      {
        variable: '--ds-primary-gradient',
        category: 'Form & Geometry',
        description: 'Button fill elevation gradient',
        lightValue: 'linear-gradient(to bottom, var(--ds-primary), ...)',
        darkValue: 'linear-gradient(to bottom, var(--ds-primary), ...)',
      },
    ],
    cssSnippet: `:root {
  --radius: 0.75rem;
  --ds-pill-radius: calc(var(--radius) * 9999);
  --ds-border-width: 1px;
  --ds-button-border: transparent;
  --ds-button-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ds-card-shadow: none;
  --ds-input-shadow: none;

  --ds-bg: var(--color-ds-100);
  --ds-fg: var(--color-ds-800);
  --ds-card: var(--color-ds-0);
  --ds-card-fg: var(--color-ds-900);
  --ds-border: var(--color-ds-300);

  --ds-primary: var(--color-ds-primary-600);
  --ds-primary-fg: var(--color-white);

  --ds-input-bg: var(--color-ds-100);
  --ds-input-border: var(--color-ds-300);
}

.dark {
  --ds-bg: var(--color-ds-950);
  --ds-fg: var(--color-ds-100);
  --ds-card: var(--color-ds-900);
  --ds-card-fg: var(--color-ds-100);
  --ds-border: var(--color-ds-800);

  --ds-primary: var(--color-ds-primary-500);
  --ds-input-bg: var(--color-ds-800);
  --ds-input-border: var(--color-ds-700);
}`,
  },
  {
    id: 'brutalist',
    label: 'Brutalism',
    tagline: 'Sharp & high-contrast',
    description:
      'Zero border-radius (0rem), flat solid fills without gradients, warm architectural paper surfaces, stark borders, and punchy Orange accents.',
    baseColor: 'stone',
    primaryColor: 'orange',
    darkBg: 'midnight',
    preferredTheme: 'light',
    radius: '0rem',
    radiusScale: {
      sm: '0px (max(0px, 0rem - 5px))',
      md: '0px (max(0px, 0rem - 3px))',
      lg: '0px (0rem)',
      xl: '0px (calc(0rem * 1.3333))',
      '2xl': '0px (calc(0rem * 1.6667))',
    },
    fontLabel: 'Inter Variable (Sans)',
    surfaceLabel: 'Flat solid + Stark borders',
    accentHex: '#ea580c',
    presetFile: 'src/dashkit/presets/brutalist.css',
    tokens: [
      {
        variable: '--ds-bg',
        category: 'Core & Surface',
        description: 'Warm archival stone background',
        lightValue: '#f5f2eb',
        darkValue: '#121110',
        lightPreviewColor: '#f5f2eb',
        darkPreviewColor: '#121110',
      },
      {
        variable: '--ds-fg',
        category: 'Core & Surface',
        description: 'High-contrast ink foreground',
        lightValue: 'var(--color-ds-950)',
        darkValue: 'var(--color-ds-50)',
        lightPreviewColor: '#0c0a09',
        darkPreviewColor: '#fafaf9',
      },
      {
        variable: '--ds-card',
        category: 'Core & Surface',
        description: 'Crisp cream/charcoal card surface',
        lightValue: '#fffdf9',
        darkValue: '#1c1917',
        lightPreviewColor: '#fffdf9',
        darkPreviewColor: '#1c1917',
      },
      {
        variable: '--ds-border',
        category: 'Core & Surface',
        description: 'Stark architectural grid border',
        lightValue: 'var(--color-ds-900)',
        darkValue: 'var(--color-ds-300)',
        lightPreviewColor: '#1c1917',
        darkPreviewColor: '#d6d3d1',
      },
      {
        variable: '--ds-primary',
        category: 'Interactive',
        description: 'Industrial safety orange accent',
        lightValue: 'var(--color-ds-primary-600)',
        darkValue: 'var(--color-ds-primary-500)',
        lightPreviewColor: '#ea580c',
        darkPreviewColor: '#f97316',
      },
      {
        variable: '--ds-secondary',
        category: 'Interactive',
        description: 'Warm stone secondary surface',
        lightValue: 'var(--color-ds-200)',
        darkValue: 'var(--color-ds-800)',
        lightPreviewColor: '#e7e5e4',
        darkPreviewColor: '#292524',
      },
      {
        variable: '--ds-input-bg',
        category: 'Form & Geometry',
        description: 'High-contrast input fill',
        lightValue: '#ffffff',
        darkValue: '#0c0a09',
        lightPreviewColor: '#ffffff',
        darkPreviewColor: '#0c0a09',
      },
      {
        variable: '--ds-input-border',
        category: 'Form & Geometry',
        description: 'Stark ink border on form controls',
        lightValue: 'var(--color-ds-900)',
        darkValue: 'var(--color-ds-300)',
        lightPreviewColor: '#1c1917',
        darkPreviewColor: '#d6d3d1',
      },
      {
        variable: '--radius',
        category: 'Form & Geometry',
        description: 'Sharp 90-degree corners everywhere',
        lightValue: '0rem',
        darkValue: '0rem',
      },
      {
        variable: '--ds-pill-radius',
        category: 'Form & Geometry',
        description: 'Forces pill Buttons, Chips & Switches to 0px',
        lightValue: '0rem',
        darkValue: '0rem',
      },
      {
        variable: '--ds-border-width',
        category: 'Form & Geometry',
        description: 'Bold 2px structural borders on Cards, Buttons & Inputs',
        lightValue: '2px',
        darkValue: '2px',
      },
      {
        variable: '--ds-button-shadow',
        category: 'Interactive',
        description: 'Hard Neo-Brutalist offset shadow on Buttons',
        lightValue: '3px 3px 0px 0px var(--ds-border)',
        darkValue: '3px 3px 0px 0px var(--ds-border)',
      },
      {
        variable: '--ds-card-shadow',
        category: 'Core & Surface',
        description: 'Hard Neo-Brutalist offset shadow on Cards',
        lightValue: '4px 4px 0px 0px var(--ds-border)',
        darkValue: '4px 4px 0px 0px var(--ds-border)',
      },
      {
        variable: '--ds-primary-gradient',
        category: 'Form & Geometry',
        description: 'Pure flat solid buttons (no gradient)',
        lightValue: 'none',
        darkValue: 'none',
      },
    ],
    cssSnippet: brutalistCssRaw.trim(),
  },
  {
    id: 'matrix',
    label: 'Matrix',
    tagline: 'Cyber terminal',
    description:
      'Phosphor-green terminal palette on deep OLED black, crisp 2px technical corners (0.125rem), flat surfaces, and full-interface monospace typography.',
    baseColor: 'zinc',
    primaryColor: 'green',
    darkBg: 'oled',
    preferredTheme: 'dark',
    radius: '0.125rem',
    radiusScale: {
      sm: '0px (max(0px, 2px - 5px))',
      md: '0px (max(0px, 2px - 3px))',
      lg: '2px (0.125rem)',
      xl: '2.6px (calc(0.125rem * 1.3333))',
      '2xl': '3.3px (calc(0.125rem * 1.6667))',
    },
    fontLabel: 'JetBrains Mono (Monospace)',
    surfaceLabel: 'CRT Terminal Phosphor',
    accentHex: '#22c55e',
    presetFile: 'src/dashkit/presets/matrix.css',
    tokens: [
      {
        variable: '--ds-bg',
        category: 'Core & Surface',
        description: 'Deep CRT terminal background',
        lightValue: '#ecfdf5',
        darkValue: '#020804',
        lightPreviewColor: '#ecfdf5',
        darkPreviewColor: '#020804',
      },
      {
        variable: '--ds-fg',
        category: 'Core & Surface',
        description: 'Phosphor green foreground text & active indicators',
        lightValue: '#052e16',
        darkValue: '#4ade80',
        lightPreviewColor: '#052e16',
        darkPreviewColor: '#4ade80',
      },
      {
        variable: '--ds-color-0..950',
        category: 'Core & Surface',
        description: 'Monochromatic phosphor green scale (tracks, pagination, tabs)',
        lightValue: '#ecfdf5 → #020804',
        darkValue: '#4ade80 → #020804',
        lightPreviewColor: '#bbf7d0',
        darkPreviewColor: '#0a2612',
      },
      {
        variable: '--ds-card',
        category: 'Core & Surface',
        description: 'Terminal panel surface',
        lightValue: '#f0fdf4',
        darkValue: '#041007',
        lightPreviewColor: '#f0fdf4',
        darkPreviewColor: '#041007',
      },
      {
        variable: '--ds-border',
        category: 'Core & Surface',
        description: 'Matrix grid line border',
        lightValue: '#16a34a',
        darkValue: '#14532d',
        lightPreviewColor: '#16a34a',
        darkPreviewColor: '#14532d',
      },
      {
        variable: '--ds-primary',
        category: 'Interactive',
        description: 'Neon phosphor green action color',
        lightValue: '#15803d',
        darkValue: '#22c55e',
        lightPreviewColor: '#15803d',
        darkPreviewColor: '#22c55e',
      },
      {
        variable: '--ds-secondary',
        category: 'Interactive',
        description: 'Subtle console highlight fill',
        lightValue: '#dcfce7',
        darkValue: '#092210',
        lightPreviewColor: '#dcfce7',
        darkPreviewColor: '#092210',
      },
      {
        variable: '--ds-input-bg',
        category: 'Form & Geometry',
        description: 'Command-prompt input background',
        lightValue: '#f0fdf4',
        darkValue: '#030c05',
        lightPreviewColor: '#f0fdf4',
        darkPreviewColor: '#030c05',
      },
      {
        variable: '--ds-input-border',
        category: 'Form & Geometry',
        description: 'Terminal input border',
        lightValue: '#16a34a',
        darkValue: '#15803d',
        lightPreviewColor: '#16a34a',
        darkPreviewColor: '#15803d',
      },
      {
        variable: '--radius',
        category: 'Form & Geometry',
        description: 'Technical 2px micro-bevel radius',
        lightValue: '0.125rem',
        darkValue: '0.125rem',
      },
      {
        variable: '--ds-pill-radius',
        category: 'Form & Geometry',
        description: 'Replaces round pills with 2px terminal corners',
        lightValue: 'var(--radius-md)',
        darkValue: 'var(--radius-md)',
      },
      {
        variable: '--ds-button-shadow',
        category: 'Interactive',
        description: 'Phosphor CRT glow on Buttons',
        lightValue: '0 0 10px -2px rgb(22 163 74 / 0.35)',
        darkValue: '0 0 12px -2px rgb(34 197 94 / 0.45)',
      },
      {
        variable: '--ds-card-shadow',
        category: 'Core & Surface',
        description: 'Subtle phosphor ambient glow on Cards',
        lightValue: '0 0 20px -8px rgb(22 163 74 / 0.2)',
        darkValue: '0 0 24px -8px rgb(34 197 94 / 0.22)',
      },
      {
        variable: '--font-sans',
        category: 'Form & Geometry',
        description: 'Global monospace font override',
        lightValue: 'var(--font-mono)',
        darkValue: 'var(--font-mono)',
      },
    ],
    cssSnippet: matrixCssRaw.trim(),
  },
];
