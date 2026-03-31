import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  framed?: boolean;
  responsive?: boolean;
  containerClassName?: string;
  minWidth?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, framed = true, responsive = true, containerClassName, minWidth, ...props }, ref) => (
    <div className={cn(
      "relative w-full",
      responsive && "overflow-x-auto overflow-y-hidden custom-scrollbar",
      framed && "ds-rounded bg-card shadow-sm p-4 md:p-6",
      containerClassName
    )}>
      <table
        ref={ref}
        style={{ minWidth: minWidth ?? (responsive ? "max-content" : undefined) }}
        className={cn("w-full caption-top text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("border-t border-border/60 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
);
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border/60 transition-colors data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  nowrap?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, nowrap = true, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle font-bold text-ds-500 dark:text-ds-400 [&:has([role=checkbox])]:pr-0 text-[10px] uppercase tracking-wider first:pl-0 last:pr-0",
        nowrap && "whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  nowrap?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, nowrap = false, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "py-3 px-4 text-sm align-middle [&:has([role=checkbox])]:pr-0 text-foreground/80 first:pl-0 last:pr-0",
        nowrap && "whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mb-4 font-medium text-sm text-muted-foreground text-left", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";
