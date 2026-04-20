import * as React from 'react';
import { cn } from '../utils/cn';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { Input } from '../Input/Input';
import { FiCheck } from 'react-icons/fi';

import './color-picker.css';

const DEFAULT_PRESETS = [
  '#000000', '#454545', '#737373', '#A3A3A3', '#D4D4D4', '#FFFFFF',
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#22D3EE', '#60A5FA', '#818CF8', '#A78BFA', '#F472B6',
  '#EF4444', '#F97316', '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
];

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  className?: string;
  label?: string;
  helperText?: string;
  error?: string;
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

  React.useEffect(() => {
    if (value !== undefined) {
      setHex(value);
    }
  }, [value]);

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

  return (
    <div className={cn('color-picker', className)}>
      {label && (
        <label className="color-picker__label">
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'color-picker__trigger',
              error && "border-ds-danger-500/50"
            )}
          >
            <ColorSwatch color={hex} />
            <span className="flex-1 text-left tabular-nums font-medium uppercase tracking-tight">
              {hex}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="color-picker__content">
          <div className="color-picker__preset-grid">
            {presets.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  'color-picker__preset-item',
                  "border-black/10 dark:border-white/10",
                  color.toLowerCase() === '#ffffff' && "border-black/20",
                  color.toLowerCase() === '#000000' && "dark:border-white/30"
                )}
                style={{ backgroundColor: color }}
              >
                {hex.toLowerCase() === color.toLowerCase() && (
                  <div
                    className={cn(
                      "color-picker__preset-item--selected",
                      (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fbbf24') && "color-picker__preset-item--selected-light"
                    )}
                  >
                    <FiCheck size={14} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="color-picker__footer">
            <Input
              value={hex}
              onChange={handleHexInput}
              placeholder="#000000"
              leftIcon={<ColorSwatch color={hex} size="sm" />}
              className="h-8"
            />
          </div>
        </PopoverContent>
      </Popover>

      {(error || helperText) && (
        <span className={error ? 'color-picker__error-text' : 'color-picker__helper-text'}>
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
      className={cn(
        'color-picker__swatch',
        size === 'sm' ? "size-4" : "size-5",
        isWhite ? "border-black/20" : "border-black/10",
        isBlack && "dark:border-white/30"
      )}
      style={{ backgroundColor: color }}
    />
  );
}

