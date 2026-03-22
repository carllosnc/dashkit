import * as React from 'react';
import { cn } from '../../utils/cn';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Whether the navbar should be sticky. Defaults to true. */
  sticky?: boolean;
  /** Whether the navbar should have a backdrop blur effect. Defaults to true. */
  blur?: boolean;
}

/**
 * Root Navbar component (container)
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ sticky = true, blur = true, className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full h-16 flex items-center border-b ds-layout-border px-4 md:px-8 ds-page",
          sticky && "sticky top-0 z-50",
          blur && "bg-base-100/70 dark:bg-base-950/70 backdrop-blur-xl",
          className
        )}
        {...props}
      >
        <div className="w-full mx-auto flex items-center justify-between gap-4">
          {children}
        </div>
      </header>
    );
  }
);
Navbar.displayName = 'Navbar';

/**
 * Brand area of the Navbar
 */
export function NavbarBrand({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 shrink-0 flex-nowrap whitespace-nowrap", className)}>
      {children}
    </div>
  );
}

/**
 * Navigation links area of the Navbar
 */
export function NavbarLinks({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav className={cn("hidden md:flex items-center gap-8", className)}>
      {children}
    </nav>
  );
}

/**
 * Actions area of the Navbar
 */
export function NavbarActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-[10px] shrink-0 flex-nowrap", className)}>
      {children}
    </div>
  );
}
