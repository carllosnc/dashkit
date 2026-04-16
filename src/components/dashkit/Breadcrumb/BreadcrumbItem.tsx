import * as React from 'react';
import { cn } from '../utils/cn';

const ITEM_ROOT = 'flex items-center gap-1.5 whitespace-nowrap';
const LINK_BASE = "flex items-center gap-1.5 text-sm transition-colors";
const LINK_INACTIVE = "text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white";
const LINK_FONT_MEDIUM = "text-ds-500 font-medium";
const LINK_ACTIVE_STYLE = "font-semibold text-ds-900 dark:text-white";

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
        className={cn(ITEM_ROOT, className)}
        {...props}
      >
        <Component
          href={href}
          className={cn(
            LINK_BASE,
            href ? LINK_INACTIVE : LINK_FONT_MEDIUM,
            active && LINK_ACTIVE_STYLE
          )}
        >
          {children}
        </Component>
      </li>
    );
  }
);
