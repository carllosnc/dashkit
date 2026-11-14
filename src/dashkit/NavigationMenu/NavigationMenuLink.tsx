import * as React from 'react';
import { cn } from '../utils/cn';

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'>
>(function NavigationMenuLink({ children, className, href, ...props }, ref) {
  return (
    <a
      ref={ref}
      data-slot="navigation-menu-link"
      href={href}
      className={cn(
        'block select-none space-y-1 ds-rounded p-2 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});

NavigationMenuLink.displayName = 'NavigationMenuLink';
