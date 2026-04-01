import * as React from 'react';
import { cn } from '../../utils/cn';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover/Popover';
import { Input } from '../Input/Input';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

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

const DEFAULT_PRESETS = [
  '#000000', '#454545', '#737373', '#A3A3A3', '#D4D4D4', '#FFFFFF',
  '#F87171', '#FB923C', '#FBBF24', '#34D399', '#22D3EE', '#60A5FA', '#818CF8', '#A78BFA', '#F472B6',
  '#EF4444', '#F97316', '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
];

export const ColorPicker = ({
  value,
  defaultValue = '#3B82F6',
  onChange,
  className,
  label,
  helperText,
  error,
  presets = DEFAULT_PRESETS
}: ColorPickerProps) => {
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
    <div className={cn("flex flex-col gap-1.5 w-full font-sans", className)}>
      {label && (
        <label className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight">
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-3 w-full h-9 px-3 ds-rounded bg-input-bg border border-input text-sm text-input-fg outline-none transition-all duration-200 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-transparent",
              error && "border-ds-danger-500/50"
            )}
          >
            <div
              className={cn(
                "size-5 rounded-md border shrink-0",
                hex.toLowerCase() === '#ffffff' ? "border-black/20" : "border-black/10",
                hex.toLowerCase() === '#000000' && "dark:border-white/30"
              )}
              style={{ backgroundColor: hex }}
            />
            <span className="flex-1 text-left tabular-nums">{hex.toUpperCase()}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-3 space-y-4 shadow-2xl">
          <div className="grid grid-cols-6 gap-2">
            {presets.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  "size-8 rounded-lg border relative flex items-center justify-center group",
                  "border-black/10 dark:border-white/10",
                  color.toLowerCase() === '#ffffff' && "border-black/20",
                  color.toLowerCase() === '#000000' && "dark:border-white/30"
                )}
                style={{ backgroundColor: color }}
              >
                {hex.toLowerCase() === color.toLowerCase() && (
                  <motion.div
                    layoutId="color-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "text-white drop-shadow-md",
                      color.toLowerCase() === '#ffffff' && "text-zinc-950 drop-shadow-none",
                    )}
                  >
                    <FiCheck size={14} strokeWidth={4} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-border/50">
            <Input
              value={hex}
              onChange={handleHexInput}
              placeholder="#000000"
              leftIcon={
                <div className={cn(
                  "size-4 ds-rounded border",
                  hex.toLowerCase() === '#ffffff' ? "border-black/20" : "border-black/10",
                  hex.toLowerCase() === '#000000' && "dark:border-white/30"
                )} style={{ backgroundColor: hex }} />
              }
              className="h-8 text-xs"
            />
          </div>
        </PopoverContent>
      </Popover>

      {(error || helperText) && (
        <span className={cn(
          "text-[12px] ml-1 tracking-tight",
          error ? "text-ds-danger-600 dark:text-ds-danger-400" : "text-ds-600"
        )}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};
