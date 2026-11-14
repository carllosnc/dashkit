import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { Input } from '../Input/Input';

const DEFAULT_PRESETS = [
  '#000000', '#454545', '#737373', '#A3A3A3', '#D4D4D4', '#FFFFFF',
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#22D3EE', '#60A5FA', '#818CF8', '#A78BFA', '#F472B6',
  '#EF4444', '#F97316', '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
];

export interface ColorPickerProps {
  value?: string;
  /** @default '#3B82F6' */
  defaultValue?: string;
  onChange?: (color: string) => void;
  className?: string;
  label?: string;
  helperText?: string;
  error?: string;
  /** @default DEFAULT_PRESETS */
  presets?: string[];
}

export function ColorPicker({
  value,
  defaultValue = '#3B82F6',
  onChange,
  className,
  label,
  helperText,
  error,
  presets = DEFAULT_PRESETS
}: ColorPickerProps) {
  const [hex, setHex] = React.useState(value || defaultValue);
  const [prevValue, setPrevValue] = React.useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== undefined) {
      setHex(value);
    }
  }

  const handleColorChange = (newColor: string) => {
    setHex(newColor);
    onChange?.(newColor);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onChange?.(val);
    }
  };

  const labelId = React.useId();
  const valueId = React.useId();
  const messageId = React.useId();

  return (
    <div data-slot="root" className={cn('flex flex-col gap-1.5 w-full font-sans', className)}>
      {label && (
        <label data-slot="label" id={labelId} className="text-[13px] font-semibold text-foreground ml-1 tracking-tight">
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            data-slot="trigger"
            type="button"
            aria-labelledby={label ? `${labelId} ${valueId}` : undefined}
            className={cn(
              'flex items-center gap-3 w-full h-9 px-3 ds-rounded bg-input-bg border border-input-border ds-input-surface text-sm text-input-fg outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-transparent',
              error && 'border-ds-danger-500/50'
            )}
          >
            <ColorSwatch color={hex} />
            <span id={valueId} className="flex-1 text-left tabular-nums font-medium uppercase tracking-tight">
              {hex}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent data-slot="content" align="start" className="w-64 p-3 space-y-4 shadow-2xl bg-popover border-popover-border">
          <div className="grid grid-cols-6 gap-2">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select color ${color}`}
                aria-pressed={hex.toLowerCase() === color.toLowerCase()}
                onClick={() => handleColorChange(color)}
                className={cn(
                  'size-8 rounded-lg border relative flex items-center justify-center overflow-hidden transition-all duration-200 hover:scale-110 active:scale-95',
                  'border-black/10 dark:border-white/10',
                  color.toLowerCase() === '#ffffff' && 'border-black/20',
                  color.toLowerCase() === '#000000' && 'dark:border-white/30'
                )}
                style={{ backgroundColor: color }}
              >
                {hex.toLowerCase() === color.toLowerCase() && (
                  <div
                    className={cn(
                      'text-ds-50 drop-shadow-md flex items-center justify-center',
                      (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fbbf24') && 'text-ds-900 drop-shadow-none'
                    )}
                  >
                    <FiCheck size={14} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-border">
            <Input
              value={hex}
              onChange={handleHexInput}
              placeholder="#000000"
              aria-label="Hex color value"
              aria-describedby={(error || helperText) ? messageId : undefined}
              aria-invalid={error ? true : undefined}
              leftIcon={<ColorSwatch color={hex} size="sm" />}
              className="h-8"
            />
          </div>
        </PopoverContent>
      </Popover>

      {(error || helperText) && (
        <span
          data-slot="helper"
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn(
            'text-[12px] ml-1 tracking-tight',
            error ? 'text-ds-danger-600 dark:text-ds-danger-400 font-medium' : 'text-muted-foreground'
          )}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

function ColorSwatch({ color, size = 'default' }: { color: string; size?: 'sm' | 'default' }) {
  const isWhite = color.toLowerCase() === '#ffffff';
  const isBlack = color.toLowerCase() === '#000000';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-md border shrink-0 transition-all duration-200',
        size === 'sm' ? 'size-4' : 'size-5',
        isWhite ? 'border-black/20' : 'border-black/10',
        isBlack && 'dark:border-white/30'
      )}
      style={{ backgroundColor: color }}
    />
  );
}

ColorPicker.displayName = 'ColorPicker';
