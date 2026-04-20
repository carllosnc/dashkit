import * as React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '../utils/cn';
import { BreadcrumbList } from './BreadcrumbList';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

import './breadcrumb.css';

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
          className={cn('breadcrumb', className)}
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
                      <span className="breadcrumb__icon-wrapper">{item.icon}</span>
                    )}
                    {item.label}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      {separator || <LuChevronRight size={14} className="breadcrumb__separator-icon" />}
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
        className={cn('breadcrumb', className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);



