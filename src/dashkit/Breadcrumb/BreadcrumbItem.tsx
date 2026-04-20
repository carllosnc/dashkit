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
        className={cn('breadcrumb__item', className)}
        {...props}
      >
        <Component
          href={href}
          className={cn(
            'breadcrumb__link',
            href ? 'breadcrumb__item--inactive' : 'breadcrumb__item--medium',
            active && 'breadcrumb__item--active'
          )}
        >
          {children}
        </Component>
      </li>
    );
  }
);
