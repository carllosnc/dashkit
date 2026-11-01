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

      <PopoverContent align="end" side="bottom" sideOffset={8} className="w-80 p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h4 className="font-semibold text-sm text-foreground">Theme Customizer</h4>
              <p className="text-xs text-muted-foreground">Adjust base & brand colors in real-time</p>
            </div>
            {!isDefault && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset to default (Zinc / Blue / Midnight)"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <FiRotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Primary Color Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Primary Color
              </span>
              <span className="text-xs capitalize font-medium text-foreground">{primaryColor}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {PRIMARY_COLORS.map(c => {
                const isSelected = primaryColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setPrimaryColor(c.id as PrimaryColor)}
                    className={clsx(
                      'flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all border',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border/60 hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: c.color }}
                    >
                      {isSelected && <FiCheck size={10} className="text-white drop-shadow-xs" />}
                    </span>
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Base Color (Neutrals) Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Base Neutral
              </span>
              <span className="text-xs capitalize font-medium text-foreground">{baseColor}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {BASE_COLORS.map(c => {
                const isSelected = baseColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setBaseColor(c.id as BaseColor)}
                    title={c.label}
                    className={clsx(
                      'flex flex-col items-center gap-1.5 p-2 rounded-md text-xs font-medium cursor-pointer transition-all border text-center',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border/60 hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: c.color }}
                    >
                      {isSelected && <FiCheck size={10} className="text-white drop-shadow-xs" />}
                    </span>
                    <span className="truncate text-[11px]">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dark Background (Midnight vs OLED Pure Black) */}
          <div className="space-y-2 pt-1 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dark Background
                </span>
                {theme !== 'dark' && (
                  <span className="text-[10px] text-muted-foreground/75">(Dark mode only)</span>
                )}
              </div>
              <span className="text-xs capitalize font-medium text-foreground">{darkBg}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {DARK_BG_OPTIONS.map(opt => {
                const isSelected = darkBg === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDarkBg(opt.id as DarkBackground)}
                    className={clsx(
                      'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all border',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border/60 hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          'w-3.5 h-3.5 rounded-full border border-border shrink-0',
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
