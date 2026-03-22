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
    tonal: "ds-btn-soft",
    filled: "ds-btn-filled",
    outlined: "ds-btn-outlined",
  },
  success: {
    tonal: "ds-status-success-soft",
    filled: "ds-status-success-filled",
    outlined: "ds-status-success-outlined",
  },
  warning: {
    tonal: "ds-status-warning-soft",
    filled: "ds-status-warning-filled",
    outlined: "ds-status-warning-outlined",
  },
  error: {
    tonal: "ds-status-error-soft",
    filled: "ds-status-error-filled",
    outlined: "ds-status-error-outlined",
  },
  info: {
    tonal: "ds-status-info-soft",
    filled: "ds-status-info-filled",
    outlined: "ds-status-info-outlined",
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
