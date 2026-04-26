import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useDropdownContext } from './useDropdown';
import { cn } from '../utils/cn';
import './dropdown.css';

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  destructive?: boolean;
  selected?: boolean;
}

export function DropdownItem({
  children,
  onClick,
  className,
  disabled,
  leftIcon,
  rightIcon,
  destructive,
  selected
}: DropdownItemProps) {
  const { setOpen } = useDropdownContext();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setOpen(false);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "dropdown-item",
        destructive && "dropdown-item--destructive",
        selected && "dropdown-item--selected",
        className
      )}
    >
      {leftIcon && <span className="dropdown-item__icon">{leftIcon}</span>}
      <span className="dropdown-item__content">{children}</span>
      {selected && <FiCheck className="dropdown-item__check" size={14} />}
      {rightIcon && <span className="dropdown-item__icon">{rightIcon}</span>}
    </button>
  );
}
