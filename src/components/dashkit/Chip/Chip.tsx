import * as React from 'react';
import { cn } from '../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipColor = 'base' | 'success' | 'warning' | 'danger' | 'error' | 'info';

const CHIP_ROOT = "inline-flex items-center gap-1.5 h-8 px-3 ds-rounded text-[13px] font-medium transition-all duration-200 border select-none";
const INTERACTIVE_STYLE = "cursor-pointer";
const STATIC_STYLE = "cursor-default";
const SELECTED_OUTLINED = "ring-2 ring-current border-transparent";
const DISABLED_STYLE = "opacity-50 cursor-not-allowed pointer-events-none";

const CHECK_ICON_STYLE = "size-3.5 -ml-0.5 animate-in fade-in zoom-in duration-200";
const ICON_WRAPPER = "size-4 -ml-0.5 flex items-center justify-center";
const LABEL_TEXT = "leading-none";

const DELETE_BTN = "size-4 -mr-1 rounded-full flex items-center justify-center transition-colors";
const DELETE_HOVER = "hover:bg-black/10 dark:hover:bg-white/10";
const DELETE_DISABLED = "cursor-not-allowed";
const DELETE_ICON_STYLE = "size-3";

const BASE_TONAL = "bg-secondary text-secondary-foreground border-transparent";
const BASE_FILLED = "bg-primary text-primary-foreground border-transparent";
const BASE_OUTLINED = "bg-transparent text-foreground";

const SUCCESS_TONAL = "bg-ds-success-600/10 text-ds-success-700 dark:text-ds-success-400 dark:bg-ds-success-500/15 border-ds-success-600/20 dark:border-ds-success-500/20";
const SUCCESS_FILLED = "bg-ds-success-600 dark:bg-ds-success-500 text-ds-success-50 dark:text-ds-success-950 border-transparent";
const SUCCESS_OUTLINED = "bg-transparent text-ds-success-700 dark:text-ds-success-400 border-ds-success-600/30 dark:border-ds-success-500/30";

const WARNING_TONAL = "bg-ds-warning-500/10 text-ds-warning-700 dark:text-ds-warning-400 dark:bg-ds-warning-500/15 border-ds-warning-500/20 dark:border-ds-warning-500/20";
const WARNING_FILLED = "bg-ds-warning-500 dark:bg-ds-warning-400 text-ds-warning-950 dark:text-ds-warning-950 border-transparent";
const WARNING_OUTLINED = "bg-transparent text-ds-warning-700 dark:text-ds-warning-400 border-ds-warning-500/30 dark:border-ds-warning-500/30";

const DANGER_TONAL = "bg-ds-danger-600/10 text-ds-danger-700 dark:text-ds-danger-400 dark:bg-ds-danger-500/15 border-ds-danger-600/20 dark:border-ds-danger-500/20";
const DANGER_FILLED = "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent";
const DANGER_OUTLINED = "bg-transparent text-ds-danger-700 dark:text-ds-danger-400 border-ds-danger-600/30 dark:border-ds-danger-500/30";

const INFO_TONAL = "bg-ds-info-600/10 text-ds-info-700 dark:text-ds-info-400 dark:bg-ds-info-500/15 border-ds-info-600/20 dark:border-ds-info-500/20";
const INFO_FILLED = "bg-ds-info-600 dark:bg-ds-info-500 text-ds-info-50 dark:text-ds-info-950 border-transparent";
const INFO_OUTLINED = "bg-transparent text-ds-info-700 dark:text-ds-info-400 border-ds-info-600/30 dark:border-ds-info-500/30";

const colorStyles: Record<ChipColor, Record<ChipVariant, string>> = {
  base: {
    tonal: BASE_TONAL,
    filled: BASE_FILLED,
    outlined: BASE_OUTLINED,
  },
  success: {
    tonal: SUCCESS_TONAL,
    filled: SUCCESS_FILLED,
    outlined: SUCCESS_OUTLINED,
  },
  warning: {
    tonal: WARNING_TONAL,
    filled: WARNING_FILLED,
    outlined: WARNING_OUTLINED,
  },
  danger: {
    tonal: DANGER_TONAL,
    filled: DANGER_FILLED,
    outlined: DANGER_OUTLINED,
  },
  error: {
    tonal: DANGER_TONAL,
    filled: DANGER_FILLED,
    outlined: DANGER_OUTLINED,
  },
  info: {
    tonal: INFO_TONAL,
    filled: INFO_FILLED,
    outlined: INFO_OUTLINED,
  },
};

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

export function Chip({
  label,
  icon,
  variant = 'tonal',
  color = 'base',
  selected = false,
  disabled = false,
  className,
  onClick,
  onDelete,
}: ChipProps) {
  const isInteractive = (!!onClick || !!onDelete) && !disabled;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        CHIP_ROOT,
        colorStyles[color][variant === 'tonal' ? 'tonal' : variant],
        isInteractive ? INTERACTIVE_STYLE : STATIC_STYLE,
        selected && variant === 'outlined' && SELECTED_OUTLINED,
        disabled && DISABLED_STYLE,
        className
      )}
    >
      {selected && (
        <FiCheck className={CHECK_ICON_STYLE} />
      )}
      {icon && !selected && (
        <div className={ICON_WRAPPER}>
          {icon}
        </div>
      )}

      <span className={LABEL_TEXT}>{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          disabled={disabled}
          className={cn(
            DELETE_BTN,
            DELETE_HOVER,
            disabled && DELETE_DISABLED
          )}
          aria-label="Remove"
        >
          <FiX className={DELETE_ICON_STYLE} />
        </button>
      )}
    </div>
  );
}
