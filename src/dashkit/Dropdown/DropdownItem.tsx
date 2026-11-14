import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useDropdownContext } from './useDropdown';
import { cn } from '../utils/cn';

export interface DropdownItemProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  destructive?: boolean;
  selected?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  function DropdownItem(
    {
      children,
      onClick,
      className,
      disabled,
      leftIcon,
      rightIcon,
      destructive,
      selected,
      type = 'button',
      ...props
    },
    ref
  ) {
    const { setOpen } = useDropdownContext();

    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        type={type}
        data-slot="dropdown-item"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'flex w-full items-center gap-2 px-2.5 py-1.5 text-sm font-medium ds-rounded transition-colors text-left text-popover-fg hover:bg-popover-item duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
          destructive && 'text-danger hover:text-ds-danger-600 dark:hover:bg-danger/10',
          selected && 'bg-popover-item-selected text-popover-item-selected-fg font-semibold',
          className
        )}
        {...props}
      >
        {leftIcon && <span className="shrink-0 text-muted-foreground">{leftIcon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {selected && <FiCheck className="shrink-0 text-ds-primary-600 dark:text-ds-primary-400" size={14} />}
        {rightIcon && <span className="shrink-0 text-muted-foreground">{rightIcon}</span>}
      </button>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';
