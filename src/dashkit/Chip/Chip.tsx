import * as React from 'react';
import { cn } from '../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';
import './chip.css';

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
        'chip',
        `chip--${variant}-${color}`,
        isInteractive ? 'chip--interactive' : 'chip--static',
        selected && variant === 'outlined' && 'chip--selected',
        disabled && 'chip--disabled',
        className
      )}
    >
      {selected && (
        <FiCheck className="chip__check-icon" />
      )}
      {icon && !selected && (
        <div className="chip__icon-wrapper">
          {icon}
        </div>
      )}

      <span className="chip__label">{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          disabled={disabled}
          className="chip__delete-button"
          aria-label="Remove"
        >
          <FiX className="chip__delete-icon" />
        </button>
      )}
    </div>
  );
}
