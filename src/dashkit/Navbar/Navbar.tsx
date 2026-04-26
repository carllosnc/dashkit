import * as React from 'react';
import { cn } from '../utils/cn';
import './navbar.css';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
  blur?: boolean;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  function Navbar({ sticky = true, blur = true, className, children, ...props }, ref) {
    return (
      <header
        ref={ref}
        className={cn(
          'navbar',
          sticky && 'navbar--sticky',
          blur && 'navbar--blur',
          className
        )}
        {...props}
      >
        <div className="navbar__inner">
          {children}
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
