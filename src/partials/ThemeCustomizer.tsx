import { useTheme } from './ThemeContext';
import {
  BASE_COLORS,
  PRIMARY_COLORS,
  DARK_BG_OPTIONS,
  type BaseColor,
  type PrimaryColor,
  type DarkBackground,
} from './themeConfig';
import { Popover, PopoverTrigger, PopoverContent } from '../dashkit/Popover';
import { IconButton } from '../dashkit/IconButton/IconButton';
import { LuPalette } from 'react-icons/lu';
import { FiCheck, FiRotateCcw } from 'react-icons/fi';
import clsx from 'clsx';

interface ThemeCustomizerProps {
  className?: string;
}

export function ThemeCustomizer({ className }: ThemeCustomizerProps) {
  const {
    theme,
    baseColor,
    setBaseColor,
    primaryColor,
    setPrimaryColor,
    darkBg,
    setDarkBg,
  } = useTheme();

  const isDefault =
    baseColor === 'zinc' && primaryColor === 'blue' && darkBg === 'midnight';

  const handleReset = () => {
    setBaseColor('zinc');
    setPrimaryColor('blue');
    setDarkBg('midnight');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          icon={<LuPalette size={18} />}
          variant="soft"
          aria-label="Customize theme colors"
          className={className}
        />
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" sideOffset={8} className="w-[320px] p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h4 className="font-semibold text-sm text-foreground">Theme Customizer</h4>
              <p className="text-xs text-muted-foreground">Adjust base & brand colors in real-time</p>
            </div>
            {!isDefault && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset to default (Zinc / Blue / Midnight)"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-muted"
              >
                <FiRotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Primary Color Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Primary Color
              </span>
              <span className="text-xs capitalize font-semibold text-foreground">
                {PRIMARY_COLORS.find(c => c.id === primaryColor)?.label || primaryColor}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2.5 justify-items-center">
              {PRIMARY_COLORS.map(c => {
                const isSelected = primaryColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setPrimaryColor(c.id as PrimaryColor)}
                    title={c.label}
                    aria-label={c.label}
                    className={clsx(
                      'size-8 rounded-full flex items-center justify-center transition-all cursor-pointer',
                      isSelected
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    )}
                    style={{ backgroundColor: c.color }}
                  >
                    {isSelected && <FiCheck size={14} className="text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Base Color (Neutrals) Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Base Neutral
              </span>
              <span className="text-xs capitalize font-semibold text-foreground">
                {BASE_COLORS.find(c => c.id === baseColor)?.label || baseColor}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 justify-items-center">
              {BASE_COLORS.map(c => {
                const isSelected = baseColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setBaseColor(c.id as BaseColor)}
                    title={c.label}
                    aria-label={c.label}
                    className={clsx(
                      'size-8 rounded-full flex items-center justify-center transition-all cursor-pointer border border-black/10 dark:border-white/10',
                      isSelected
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    )}
                    style={{ backgroundColor: c.color }}
                  >
                    {isSelected && <FiCheck size={14} className="text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dark Background (Midnight vs OLED Pure Black) */}
          <div className="space-y-2.5 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dark Background
                </span>
                {theme !== 'dark' && (
                  <span className="text-[10px] text-muted-foreground/75">(Dark mode only)</span>
                )}
              </div>
              <span className="text-xs capitalize font-semibold text-foreground">{darkBg}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DARK_BG_OPTIONS.map(opt => {
                const isSelected = darkBg === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDarkBg(opt.id as DarkBackground)}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all border',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border/60 hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          'size-3.5 rounded-full border border-border shrink-0',
                          opt.id === 'oled' ? 'bg-black' : 'bg-[#18181b]'
                        )}
                      />
                      <span>{opt.label}</span>
                    </div>
                    {isSelected && <FiCheck size={12} className="text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
