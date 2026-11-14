import * as React from 'react';
import { cn } from '../utils/cn';

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>(function NavigationMenuList({ children, className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-slot="navigation-menu-list"
      className={cn('flex flex-1 list-none items-center justify-center gap-1', className)}
      {...props}
    >
      {children}
    </ul>
  );
});

NavigationMenuList.displayName = 'NavigationMenuList';
