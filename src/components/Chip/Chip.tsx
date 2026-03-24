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
    outlined: "bg-transparent text-foreground border-border",
  },
  success: {
    tonal: "bg-success/10 text-success border-success/20",
    filled: "bg-success text-success-foreground border-transparent",
    outlined: "bg-transparent text-success border-success/30",
  },
  warning: {
    tonal: "bg-warning/10 text-warning border-warning/20",
    filled: "bg-warning text-warning-foreground border-transparent",
    outlined: "bg-transparent text-warning border-warning/30",
  },
  danger: {
    tonal: "bg-danger/10 text-danger border-danger/20",
    filled: "bg-danger text-danger-foreground border-transparent",
    outlined: "bg-transparent text-danger border-danger/30",
  },
  error: {
    tonal: "bg-danger/10 text-danger border-danger/20",
    filled: "bg-danger text-danger-foreground border-transparent",
    outlined: "bg-transparent text-danger border-danger/30",
  },
  info: {
    tonal: "bg-info/10 text-info border-info/20",
    filled: "bg-info text-info-foreground border-transparent",
    outlined: "bg-transparent text-info border-info/30",
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


