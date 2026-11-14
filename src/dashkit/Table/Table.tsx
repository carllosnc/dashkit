import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="table-container"
      className={cn('relative w-full overflow-x-auto custom-scrollbar', className)}
      {...props}
    >
      {children}
    </div>
  )
);
TableContainer.displayName = 'TableContainer';

export type TableProps = HTMLAttributes<HTMLTableElement>;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      data-slot="table"
      className={cn('w-full caption-top text-sm font-sans', className)}
      {...props}
    />
  )
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn('border-t border-border/60 font-medium [&>tr:last-child]:border-b-0', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn('border-b border-border/60 transition-colors data-[state=selected]:bg-muted', className)}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** @default true */
  nowrap?: boolean;
  /** @default 'left' */
  align?: 'left' | 'center' | 'right';
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, nowrap = true, align = 'left', ...props }, ref) => (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        'h-11 px-4 align-middle font-bold text-muted-foreground text-xs uppercase tracking-wider [&:has([role=checkbox])]:pr-0',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        nowrap && 'whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** @default false */
  nowrap?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, nowrap = false, align, ...props }, ref) => (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        'py-3 px-4 text-sm align-middle text-foreground/80 [&:has([role=checkbox])]:pr-0',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        nowrap && 'whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn('mb-4 font-medium text-sm text-muted-foreground text-left', className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';
