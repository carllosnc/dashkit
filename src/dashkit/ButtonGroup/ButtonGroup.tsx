import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import './button-group.css';
import { cn } from '../utils/cn';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

export function ButtonGroup({ children, className, vertical = false }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'btn-group',
        vertical ? 'btn-group-vertical' : 'btn-group-horizontal',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function ButtonGroupItem({
  children,
  className,
  selected = false,
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      className={cn(
        'btn-group-item',
        selected && 'btn-group-item-selected',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroupItem.displayName = 'ButtonGroupItem';

