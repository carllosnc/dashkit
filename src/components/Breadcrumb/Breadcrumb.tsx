import * as React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  separator?: React.ReactNode;
  items?: {
    label: React.ReactNode;
    href?: string;
    active?: boolean;
    icon?: React.ReactNode;
  }[];
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, children, ...props }, ref) => {
    if (items) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn('flex', className)}
          {...props}
        >
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem
                    href={!isLast ? item.href : undefined}
                    active={isLast || item.active}
                  >
                    {item.icon && (
                      <span className="shrink-0">{item.icon}</span>
                    )}
                    {item.label}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      {separator || <ChevronRight size={14} className="text-ds-400" />}
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn('flex', className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex items-center gap-1.5 text-sm text-ds-500 sm:gap-2.5 dark:text-ds-400',
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {
  href?: string;
  active?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, active, className, children, ...props }, ref) => {
    const Component = href ? 'a' : 'span';

    return (
      <li
        ref={ref}
        className={cn('flex items-center gap-1.5 whitespace-nowrap', className)}
        {...props}
      >
        <Component
          href={href}
          className={cn(
            "flex items-center gap-1.5 text-sm transition-colors",
            href
              ? "text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white" 
              : "text-ds-500 font-medium",
            active && "font-semibold text-ds-900 dark:text-white"
          )}
        >
          {children}
        </Component>
      </li>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight size={14} className="text-ds-400" />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';


