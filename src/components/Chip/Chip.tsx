import * as React from 'react';
import { cn } from '../../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipColor = 'base' | 'success' | 'warning' | 'danger' | 'error' | 'info';

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
    outlined: "bg-transparent text-foreground",
  },
  success: {
    tonal: "bg-ds-success-600/10 text-ds-success-700 dark:text-ds-success-400 dark:bg-ds-success-500/15 border-ds-success-600/20 dark:border-ds-success-500/20",
    filled: "bg-ds-success-600 dark:bg-ds-success-500 text-ds-success-50 dark:text-ds-success-950 border-transparent",
    outlined: "bg-transparent text-ds-success-700 dark:text-ds-success-400 border-ds-success-600/30 dark:border-ds-success-500/30",
  },
  warning: {
    tonal: "bg-ds-warning-500/10 text-ds-warning-700 dark:text-ds-warning-400 dark:bg-ds-warning-500/15 border-ds-warning-500/20 dark:border-ds-warning-500/20",
    filled: "bg-ds-warning-500 dark:bg-ds-warning-400 text-ds-warning-950 dark:text-ds-warning-950 border-transparent",
    outlined: "bg-transparent text-ds-warning-700 dark:text-ds-warning-400 border-ds-warning-500/30 dark:border-ds-warning-500/30",
  },
  danger: {
    tonal: "bg-ds-danger-600/10 text-ds-danger-700 dark:text-ds-danger-400 dark:bg-ds-danger-500/15 border-ds-danger-600/20 dark:border-ds-danger-500/20",
    filled: "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent",
    outlined: "bg-transparent text-ds-danger-700 dark:text-ds-danger-400 border-ds-danger-600/30 dark:border-ds-danger-500/30",
  },
  error: {
    tonal: "bg-ds-danger-600/10 text-ds-danger-700 dark:text-ds-danger-400 dark:bg-ds-danger-500/15 border-ds-danger-600/20 dark:border-ds-danger-500/20",
    filled: "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent",
    outlined: "bg-transparent text-ds-danger-700 dark:text-ds-danger-400 border-ds-danger-600/30 dark:border-ds-danger-500/30",
  },
  info: {
    tonal: "bg-ds-info-600/10 text-ds-info-700 dark:text-ds-info-400 dark:bg-ds-info-500/15 border-ds-info-600/20 dark:border-ds-info-500/20",
    filled: "bg-ds-info-600 dark:bg-ds-info-500 text-ds-info-50 dark:text-ds-info-950 border-transparent",
    outlined: "bg-transparent text-ds-info-700 dark:text-ds-info-400 border-ds-info-600/30 dark:border-ds-info-500/30",
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
        "inline-flex items-center gap-1.5 h-8 px-3 ds-rounded text-[13px] font-medium transition-all duration-200 border select-none",
        colorStyles[color][variant === 'tonal' ? 'tonal' : variant],
        isInteractive ? "cursor-pointer" : "cursor-default",
        selected && variant === 'outlined' && "ring-2 ring-current border-transparent",
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


