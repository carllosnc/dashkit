import * as React from 'react';
import { cn } from '../../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipColor = 'base' | 'success' | 'warning' | 'error' | 'info';

export interface ChipProps {
  /** The content of the chip. */
  label: React.ReactNode;
  /** Leading icon element. */
  icon?: React.ReactNode;
  /** Variant style of the chip. Defaults to 'tonal'. */
  variant?: ChipVariant;
  /** Color theme of the chip. Defaults to 'base'. */
  color?: ChipColor;
  /** Whether the chip is selected (shows a checkmark if filter). */
  selected?: boolean;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Custom classes for the chip container. */
  className?: string;
  /** Callback fired when the chip is clicked. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Callback fired when the delete icon is clicked. */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const colorStyles: Record<ChipColor, Record<ChipVariant, string>> = {
  base: {
    tonal: "bg-button-soft-bg text-button-soft-fg border-transparent hover:bg-button-soft-hover dark:bg-button-soft-dark-bg dark:text-button-soft-dark-fg dark:hover:bg-button-soft-dark-hover",
    filled: "bg-button-filled-bg text-button-filled-fg border-transparent hover:bg-button-filled-hover dark:bg-button-filled-dark-bg dark:text-button-filled-dark-fg dark:hover:bg-button-filled-dark-hover",
    outlined: "bg-button-outlined-bg text-button-outlined-fg border-button-outlined-border hover:bg-button-outlined-hover dark:bg-button-outlined-dark-bg dark:text-button-outlined-dark-fg dark:border-button-outlined-dark-border dark:hover:bg-button-outlined-dark-hover",
  },
  success: {
    tonal: "bg-emerald-100/50 text-emerald-800 border-transparent dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
    filled: "bg-emerald-600 text-white border-transparent hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400",
    outlined: "bg-transparent text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/5",
  },
  warning: {
    tonal: "bg-amber-100/50 text-amber-800 border-transparent dark:bg-amber-500/10 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20",
    filled: "bg-amber-500 text-white border-transparent hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400",
    outlined: "bg-transparent text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-500/30 dark:hover:bg-amber-500/5",
  },
  error: {
    tonal: "bg-red-100/50 text-red-800 border-transparent dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20",
    filled: "bg-red-600 text-white border-transparent hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
    outlined: "bg-transparent text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/5",
  },
  info: {
    tonal: "bg-blue-100/50 text-blue-800 border-transparent dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20",
    filled: "bg-blue-600 text-white border-transparent hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400",
    outlined: "bg-transparent text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500/30 dark:hover:bg-blue-500/5",
  },
};

/**
 * Chip component inspired by Material Design 3.
 * Used for actions, selection, and input.
 */
export const Chip = ({
  label,
  icon,
  variant = 'tonal',
  color = 'base',
  selected = false,
  disabled = false,
  className,
  onClick,
  onDelete,
}: ChipProps) => {
  const isInteractive = (!!onClick || !!onDelete) && !disabled;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-button text-[13px] font-medium transition-all duration-200 border select-none",
        colorStyles[color][variant === 'tonal' ? 'tonal' : variant],
        isInteractive ? "cursor-pointer" : "cursor-default",
        selected && variant === 'outlined' && "border-selection-checked-border dark:border-selection-dark-checked-border ring-1 ring-selection-checked-border dark:ring-selection-dark-checked-border",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {selected && (
        <FiCheck className="size-3.5 -ml-0.5 animate-in fade-in zoom-in duration-200" />
      )}
      {icon && !selected && (
        <div className="size-4 -ml-0.5 flex items-center justify-center">
          {icon}
        </div>
      )}
      
      <span className="leading-none">{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          disabled={disabled}
          className={cn(
            "size-4 -mr-1 rounded-full flex items-center justify-center transition-colors",
            "hover:bg-black/10 dark:hover:bg-white/10",
            disabled && "cursor-not-allowed"
          )}
          aria-label="Remove"
        >
          <FiX className="size-3" />
        </button>
      )}
    </div>
  );
};

Chip.displayName = 'Chip';
