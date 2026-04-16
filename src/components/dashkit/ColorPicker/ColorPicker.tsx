import * as React from 'react';
import { cn } from '../utils/cn';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover/Popover';
import { Input } from '../Input/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const CONTAINER = "flex flex-col gap-1.5 w-full font-sans";
const LABEL = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight";
const TRIGGER = "flex items-center gap-3 w-full h-9 px-3 ds-rounded bg-input-bg border border-input-border text-sm text-input-fg outline-none transition-all duration-200 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-transparent";
const CONTENT = "w-64 p-3 space-y-4 shadow-2xl border-ds-popover-border bg-ds-popover";
const PRESET_GRID = "grid grid-cols-6 gap-2";
const PRESET_ITEM = "size-8 rounded-lg border relative flex items-center justify-center group overflow-hidden transition-all duration-200 hover:scale-110 active:scale-95";
const FOOTER = "pt-3 border-t border-ds-border/50";
const SWATCH_BASE = "rounded-md border shrink-0 transition-all duration-200";

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
    <div className={cn(CONTAINER, className)}>
      {label && (
        <label className={LABEL}>
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              TRIGGER,
              error && "border-ds-danger-500/50"
            )}
          >
            <ColorSwatch color={hex} />
            <span className="flex-1 text-left tabular-nums font-medium uppercase tracking-tight">
              {hex}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className={CONTENT}>
          <div className={PRESET_GRID}>
            {presets.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  PRESET_ITEM,
                  "border-black/10 dark:border-white/10",
                  color.toLowerCase() === '#ffffff' && "border-black/20",
                  color.toLowerCase() === '#000000' && "dark:border-white/30"
                )}
                style={{ backgroundColor: color }}
              >
                <AnimatePresence>
                  {hex.toLowerCase() === color.toLowerCase() && (
                    <motion.div
                      layoutId="color-check-mark"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={cn(
                        "text-ds-50 drop-shadow-md flex items-center justify-center",
                        (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fbbf24') && "text-ds-900 drop-shadow-none"
                      )}
                    >
                      <FiCheck size={14} strokeWidth={4} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <div className={FOOTER}>
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
        <span className={cn(
          "text-[12px] ml-1 tracking-tight",
          error ? "text-ds-danger-600 dark:text-ds-danger-400" : "text-ds-600"
        )}>
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
        SWATCH_BASE,
        size === 'sm' ? "size-4" : "size-5",
        isWhite ? "border-black/20" : "border-black/10",
        isBlack && "dark:border-white/30"
      )}
      style={{ backgroundColor: color }}
    />
  );
}

