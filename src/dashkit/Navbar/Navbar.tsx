import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const navbarVariants = cva(
  'w-full h-14 sm:h-16 min-h-14 sm:min-h-16 flex items-center border-b px-3 sm:px-6 md:px-8 bg-ds-50 text-ds-950 dark:bg-ds-900 dark:text-ds-50 dark:border-ds-800',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 z-[1000]',
        false: '',
      },
      blur: {
        true: 'bg-ds-100/70 backdrop-blur-xl dark:bg-ds-950/70',
        false: '',
      },
    },
    defaultVariants: {
      sticky: true,
      blur: true,
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  children: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  function Navbar({ sticky = true, blur = true, className, children, ...props }, ref) {
    return (
      <header
        ref={ref}
        data-slot="navbar"
        className={cn(navbarVariants({ sticky, blur }), className)}
        {...props}
      >
        <div data-slot="navbar-inner" className="w-full mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {children}
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
