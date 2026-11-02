import * as React from 'react';
import { cn } from '../utils/cn';
import { FiX, FiCheck } from 'react-icons/fi';
import './chip.css';

export type ChipVariant = 'filled' | 'outlined' | 'tonal';
export type ChipColor = 'base' | 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';

export interface ChipProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
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
  // A real <button> can't contain the delete <button>, so only use it when
  // there is no delete action; otherwise the root gets button semantics
  // plus an explicit keyboard handler.
  const useButtonElement = !!onClick && !disabled && !onDelete;
  const isKeyboardActivatable = !!onClick && !disabled && !useButtonElement;

  const classes = cn(
    'chip',
    `chip--${variant}-${color}`,
    isInteractive ? 'chip--interactive' : 'chip--static',
    selected && variant === 'outlined' && 'chip--selected',
    disabled && 'chip--disabled',
    className
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // The keyboard event carries the same information consumers rely on
      // (target, currentTarget, ...) as the mouse event the prop declares.
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement | HTMLDivElement>);
    }
  };

  const content = (
    <>
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
    </>
  );

  if (useButtonElement) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      onClick={disabled ? undefined : onClick}
      role={isKeyboardActivatable ? 'button' : undefined}
      tabIndex={isKeyboardActivatable ? 0 : undefined}
      aria-pressed={isKeyboardActivatable ? selected : undefined}
      onKeyDown={isKeyboardActivatable ? handleKeyDown : undefined}
      className={classes}
    >
      {content}
    </div>
  );
}
