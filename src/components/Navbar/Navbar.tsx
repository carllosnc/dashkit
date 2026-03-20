import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo element to display on the left. */
  logo?: React.ReactNode;
  /** Brand text to display next to the logo. */
  brandName?: string;
  /** Element to display to the left of branding (e.g., mobile menu toggle). */
  left?: React.ReactNode;
  /** Navigation links. */
  links?: Array<{ label: string; href: string; active?: boolean }>;
  /** Action elements (e.g., buttons, icons) to display on the right. */
  actions?: React.ReactNode;
  /** Whether the navbar should be sticky. Defaults to true. */
  sticky?: boolean;
  /** Whether the navbar should have a backdrop blur effect. Defaults to true. */
  blur?: boolean;
}

/**
 * A responsive, premium Navbar component with support for branding, navigation, and custom actions.
 * 
 * @see https://dashkit-ui.com/docs/navbar
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ 
    logo, 
    brandName, 
    left,
    links = [], 
    actions, 
    sticky = true, 
    blur = true,
    className,
    children, 
    ...props 
  }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full h-16 flex items-center border-b border-base-200 dark:border-base-800 px-4 md:px-8 bg-white dark:bg-[#030303]",
          sticky && "sticky top-0 z-50",
          blur && "bg-white/70 dark:bg-[#030303]/70 backdrop-blur-xl",
          className
        )}
        {...props}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          {/* Brand/Logo Area */}
          <div className="flex items-center gap-4 shrink-0">
            {left && <div className="flex items-center">{left}</div>}
            {logo && <Link to="/" className="flex items-center justify-center">{logo}</Link>}
            {brandName && (
              <span className="text-lg font-bold tracking-tight text-base-950 dark:text-white">
                {brandName}
              </span>
            )}
            {children && !logo && !brandName && children}
          </div>

          {/* Navigation Links Area (Desktop) */}
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-base-950 dark:hover:text-white",
                    link.active 
                      ? "text-base-950 dark:text-white" 
                      : "text-base-500 dark:text-base-400"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Actions Area */}
          {actions && (
            <div className="flex items-center gap-3 shrink-0 uppercase tracking-widest text-[11px] font-bold">
              {actions}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
