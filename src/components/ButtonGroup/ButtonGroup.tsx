import { type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

/**
 * A layout component for grouping multiple buttons together.
 * 
 * @see https://dashkit-ui.com/docs/button-group
 */
export function ButtonGroup({ children, className, vertical = false }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex isolate",
        // Horizontal Layout
        !vertical && [
          "flex-row -space-x-px",
          "[&>*:first-child]:rounded-r-none",
          "[&>*:last-child]:rounded-l-none",
          "[&>*:not(:first-child):not(:last-child)]:rounded-none",
        ],
        // Vertical Layout
        vertical && [
          "flex-col -space-y-px",
          "[&>*:first-child]:rounded-b-none",
          "[&>*:last-child]:rounded-t-none",
          "[&>*:not(:first-child):not(:last-child)]:rounded-none",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
