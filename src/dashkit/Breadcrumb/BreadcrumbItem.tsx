import * as React from 'react';
import { cn } from '../utils/cn';

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {
  href?: string;
  active?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ href, active, className, children, ...props }, ref) {
    const Component = href ? 'a' : 'span';

    return (
      <li
        ref={ref}
        className={cn('flex items-center gap-1.5 whitespace-nowrap', className)}
        {...props}
      >
        <Component
          href={href}
          className={cn(
            'flex items-center gap-1.5 text-sm transition-colors',
            href ? 'text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white' : 'text-ds-500 font-medium',
            active && 'font-semibold text-ds-900 dark:text-white'
          )}
        >
          {children}
        </Component>
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
