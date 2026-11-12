import { useTheme } from './ThemeContext';
import {
  BASE_COLORS,
  PRIMARY_COLORS,
  THEME_PRESETS,
  type BaseColor,
  type PrimaryColor,
} from './themeConfig';
import { Popover, PopoverTrigger, PopoverContent } from '../dashkit/Popover';
import { IconButton } from '../dashkit/IconButton/IconButton';
import { Button } from '../dashkit/Button/Button';
import { LuPalette } from 'react-icons/lu';
import { FiCheck, FiRotateCcw } from 'react-icons/fi';
import clsx from 'clsx';

export interface ThemeCustomizerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeCustomizer({ className, size = 'sm' }: ThemeCustomizerProps) {
  const {
    baseColor,
    setBaseColor,
    primaryColor,
    setPrimaryColor,
    preset,
    setPreset,
  } = useTheme();

  const isDefault = preset === 'default' && baseColor === 'zinc' && primaryColor === 'blue';

  const handleReset = () => {
    setPreset('default');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          icon={<LuPalette size={size === 'sm' ? 16 : 18} />}
          size={size}
          variant="soft"
          aria-label="Customize theme colors"
          className={className}
        />
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" sideOffset={8} className="w-[330px] p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="pb-3 border-b border-border">
            <h4 className="font-semibold text-sm text-foreground">Theme Customizer</h4>
            <p className="text-xs text-muted-foreground">Switch design presets & palettes in real-time</p>
          </div>

          {/* Preset Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Style Preset
              </span>
              <span className="text-xs font-semibold text-foreground">
                {THEME_PRESETS.find(p => p.id === preset)?.label}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {THEME_PRESETS.map(p => {
                const isSelected = preset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreset(p.id)}
                    className={clsx(
                      'px-3 py-2 text-left ds-rounded border transition-all cursor-pointer flex items-center justify-between gap-3',
                      isSelected
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="size-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.accentHex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-foreground leading-tight">
                          {p.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate leading-tight">
                          {p.tagline}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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

          {/* Footer Reset Button */}
          <div className="pt-2 border-t border-border">
            <Button
              variant="outlined"
              size="sm"
              className="w-full"
              leftIcon={<FiRotateCcw size={13} />}
              onClick={handleReset}
              disabled={isDefault}
            >
              Reset to default
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
