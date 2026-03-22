import * as React from 'react';
import { cn } from '../../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipColor = 'base' | 'success' | 'warning' | 'error' | 'info';

export interface ChipProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const colorStyles: Record<ChipColor, Record<ChipVariant, string>> = {
  base: {
    tonal: "bg-secondary text-secondary-foreground border-transparent",
    filled: "bg-primary text-primary-foreground border-transparent",
    outlined: "bg-transparent text-foreground border-border",
  },
  success: {
    tonal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    filled: "bg-emerald-500 text-white border-transparent",
    outlined: "bg-transparent text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  warning: {
    tonal: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    filled: "bg-amber-500 text-white border-transparent",
    outlined: "bg-transparent text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  error: {
    tonal: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    filled: "bg-red-500 text-white border-transparent",
    outlined: "bg-transparent text-red-600 dark:text-red-400 border-red-500/30",
  },
  info: {
    tonal: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    filled: "bg-blue-500 text-white border-transparent",
    outlined: "bg-transparent text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
};

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
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium transition-all duration-200 border select-none",
        colorStyles[color][variant === 'tonal' ? 'tonal' : variant],
        isInteractive ? "cursor-pointer" : "cursor-default",
        selected && variant === 'outlined' && "border-selection-checked-border dark:border-selection-dark-checked-border ring-2 ring-selection-checked-border dark:ring-selection-dark-checked-border",
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


