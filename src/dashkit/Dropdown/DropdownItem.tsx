import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useDropdownContext } from './useDropdown';
import { cn } from '../utils/cn';

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
        "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium ds-rounded transition-colors text-left text-popover-fg hover:bg-popover-item duration-200",
        destructive ? "text-red-500 hover:text-red-600 dark:hover:bg-red-500/10" : "",
        selected && "bg-popover-item-selected text-popover-item-selected-fg font-semibold",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && <span className="shrink-0 text-ds-400">{leftIcon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {selected && <FiCheck className="shrink-0 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg" size={14} />}
      {rightIcon && <span className="shrink-0 text-ds-400">{rightIcon}</span>}
    </button>
  );
}
