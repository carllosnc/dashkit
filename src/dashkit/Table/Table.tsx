import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import './table.css';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  framed?: boolean;
  responsive?: boolean;
  containerClassName?: string;
  minWidth?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, framed = true, responsive = true, containerClassName, minWidth, ...props }, ref) => (
    <div className={cn(
      'table-container',
      responsive && 'table-container--responsive',
      framed && 'table-container--framed',
      containerClassName
    )}>
      <table
        ref={ref}
        style={{ minWidth: minWidth ?? (responsive ? 'max-content' : undefined) }}
        className={cn('table', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('table__header', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('table__body', className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('table__footer', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('table__row', className)}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  nowrap?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, nowrap = true, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'table__head',
        nowrap && 'table__head--nowrap',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  nowrap?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, nowrap = false, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'table__cell',
        nowrap && 'table__cell--nowrap',
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
      className={cn('table__caption', className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';
