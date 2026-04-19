import * as React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '../utils/cn';
import { BreadcrumbList } from './BreadcrumbList';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

const NAV_ROOT = 'flex';
const ICON_WRAPPER = "shrink-0";
const DEFAULT_COLOR = "text-ds-400";

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
  function Breadcrumb({ items, separator, className, children, ...props }, ref) {
    if (items) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(NAV_ROOT, className)}
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
                      <span className={ICON_WRAPPER}>{item.icon}</span>
                    )}
                    {item.label}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      {separator || <LuChevronRight size={14} className={DEFAULT_COLOR} />}
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
        className={cn(NAV_ROOT, className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);



