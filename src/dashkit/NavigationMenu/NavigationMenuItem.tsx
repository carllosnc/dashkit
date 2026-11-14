import * as React from 'react';
import { cn } from '../utils/cn';

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(function NavigationMenuItem({ children, className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    >
      {children}
    </li>
  );
});

NavigationMenuItem.displayName = 'NavigationMenuItem';
