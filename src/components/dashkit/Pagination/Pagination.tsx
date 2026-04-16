import * as React from 'react';
import { cn } from '../utils/cn';
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';
import { motion } from 'framer-motion';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

const DOTS = '...';

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationProps) {
  const paginationId = React.useId();
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className={cn(
          "size-9 ds-rounded flex items-center justify-center text-sm font-medium transition-colors",
          "bg-ds-200 dark:bg-ds-800 hover:bg-ds-300 dark:hover:bg-ds-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring",
          "disabled:opacity-50 disabled:pointer-events-none text-ds-500"
        )}
        aria-label="Previous page"
      >
        <FiChevronLeft className="size-4" />
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`dots-${index}`}
              className="size-9 flex items-center justify-center text-ds-400"
              aria-hidden="true"
            >
              <FiMoreHorizontal className="size-4" />
            </div>
          );
        }

        const isCurrent = pageNumber === currentPage;

        return (
          <button
            key={`page-${pageNumber}`}
            type="button"
            onClick={() => onChange(pageNumber as number)}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "relative size-9 ds-rounded flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring",
              isCurrent
                ? "z-10 text-primary-foreground pointer-events-none"
                : "bg-ds-200 dark:bg-ds-800 hover:bg-ds-300 dark:hover:bg-ds-700 text-foreground"
            )}
          >
            {isCurrent && (
              <motion.div
                layoutId={`pagination-active-${paginationId}`}
                className="absolute inset-0 ds-primary-gradient shadow-sm ds-rounded pointer-events-none"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{pageNumber}</span>
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
        className={cn(
          "size-9 ds-rounded flex items-center justify-center text-sm font-medium transition-colors",
          "bg-ds-200 dark:bg-ds-800 hover:bg-ds-300 dark:hover:bg-ds-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring",
          "disabled:opacity-50 disabled:pointer-events-none text-ds-500"
        )}
        aria-label="Next page"
      >
        <FiChevronRight className="size-4" />
      </button>
    </nav>
  );
}
