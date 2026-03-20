import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

/**
 * Breadcrumb component for secondary navigation.
 * Helps users understand their current location within the hierarchy.
 * 
 * @see https://dashkit-ui.com/docs/breadcrumb
 */
export const Breadcrumb = ({
  items,
  separator = <ChevronRight size={14} className="text-base-400" />,
  className,
}: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              <li className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-1.5 text-sm font-medium text-base-500 hover:text-base-900 dark:text-base-400 dark:hover:text-white transition-colors"
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-semibold",
                      isLast || item.active
                        ? "text-base-900 dark:text-white"
                        : "text-base-500 dark:text-base-400"
                    )}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="flex items-center" role="presentation">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
