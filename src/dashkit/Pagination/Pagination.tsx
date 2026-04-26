import * as React from 'react';
import { cn } from '../utils/cn';
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './pagination.css';

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
      className={cn('pagination', className)}
      {...props}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className="pagination__arrow"
        aria-label="Previous page"
      >
        <FiChevronLeft className="size-4" />
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`dots-${index}`}
              className="pagination__dots"
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
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'pagination__item',
              isCurrent ? 'pagination__item--current' : 'pagination__item--default'
            )}
          >
            {isCurrent && (
              <motion.div
                layoutId={`pagination-active-${paginationId}`}
                className="pagination__active-indicator"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
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
        className="pagination__arrow"
        aria-label="Next page"
      >
        <FiChevronRight className="size-4" />
      </button>
    </nav>
  );
}

Pagination.displayName = 'Pagination';
