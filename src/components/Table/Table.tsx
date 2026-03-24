import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  framed?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, framed = true, ...props }, ref) => (
    <div className={cn(
      "relative w-full overflow-auto",
      framed && "rounded-[var(--radius)] bg-card shadow-sm p-6"
    )}>
      <table
        ref={ref}
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
        "border-b border-border/60 transition-colors hover:bg-ds-50 dark:hover:bg-ds-950/20 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-0 text-left align-middle font-semibold text-ds-500 dark:text-ds-400 [&:has([role=checkbox])]:pr-0 text-[12px]",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("py-3 text-sm align-middle [&:has([role=checkbox])]:pr-0 text-foreground/80", className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mb-4 font-medium text-sm text-foreground text-left", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";
