import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuLink({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={cn(
        'block select-none space-y-1 ds-rounded p-2 leading-none no-underline outline-none hover:bg-ds-100 dark:hover:bg-ds-800 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        className
      )}
    >
      {children}
    </a>
  );
}
