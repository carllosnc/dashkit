import {
  createContext,
  forwardRef,
  Fragment,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type Key,
  type ReactNode,
  type RefObject,
  type TdHTMLAttributes,
  type ThHTMLAttributes
} from 'react';
import { cn } from '../utils/cn';

const TableScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Optional max height (px or CSS string) enabling vertical scrolling for virtualized or sticky tables. @default undefined */
  maxHeight?: number | string;
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, maxHeight, style, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, []);

    const resolvedMaxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    return (
      <TableScrollContext.Provider value={containerRef}>
        <div
          ref={containerRef}
          data-slot="table-container"
          style={resolvedMaxHeight ? { maxHeight: resolvedMaxHeight, ...style } : style}
          className={cn(
            'relative w-full overflow-x-auto custom-scrollbar',
            resolvedMaxHeight && 'overflow-y-auto',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TableScrollContext.Provider>
    );
  }
);
TableContainer.displayName = 'TableContainer';

export type TableProps = HTMLAttributes<HTMLTableElement>;

/**
 * Compound semantic data table (`children` with `TableContainer`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`).
 *
 * @example
 * ```tsx
 * <TableContainer>
 *   <Table>
 *     <TableHeader>
 *       <TableRow><TableHead>Name</TableHead></TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow><TableCell>Alice</TableCell></TableRow>
 *     </TableBody>
 *   </Table>
 * </TableContainer>
 * ```
 */
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

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Keeps the table header pinned to the top inside a scrollable `TableContainer`. @default false */
  sticky?: boolean;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky = false, ...props }, ref) => (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn(
        '[&_tr]:border-b',
        sticky && 'sticky top-0 z-10 bg-background/95 backdrop-blur-sm',
        className
      )}
      {...props}
    />
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

export interface VirtualTableBodyProps<T> extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  /** Array of row data items to virtualize. */
  items: readonly T[];
  /** Estimated fixed height (in px) of each row. @default 48 */
  estimateSize?: number;
  /** Number of extra rows rendered above and below the visible window. @default 5 */
  overscan?: number;
  /** Viewport height (in px) fallback when container height cannot be measured. @default 400 */
  viewportHeight?: number;
  /** Optional external scroll container ref; automatically inherited from `TableContainer` when omitted. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Optional stable key extractor for each rendered row. */
  getRowKey?: (item: T, index: number) => Key;
  /** Render callback for each visible row (typically returning `<TableRow>`). */
  renderRow: (item: T, index: number) => ReactNode;
  /** Optional fallback rendered when `items` is empty. */
  emptyState?: ReactNode;
}

/**
 * Virtualized table body (`<tbody>`) for rendering large datasets efficiently inside a scrollable `TableContainer`.
 *
 * @example
 * ```tsx
 * <TableContainer maxHeight={400}>
 *   <Table>
 *     <TableHeader sticky>
 *       <TableRow><TableHead>Name</TableHead></TableRow>
 *     </TableHeader>
 *     <VirtualTableBody
 *       items={rows}
 *       estimateSize={48}
 *       renderRow={(row) => (
 *         <TableRow key={row.id}>
 *           <TableCell>{row.name}</TableCell>
 *         </TableRow>
 *       )}
 *     />
 *   </Table>
 * </TableContainer>
 * ```
 */
export function VirtualTableBody<T>({
  items,
  estimateSize = 48,
  overscan = 5,
  viewportHeight = 400,
  scrollContainerRef,
  getRowKey,
  renderRow,
  emptyState,
  className,
  ...props
}: VirtualTableBodyProps<T>) {
  const inheritedScrollRef = useContext(TableScrollContext);
  const activeScrollRef = scrollContainerRef ?? inheritedScrollRef;

  const [scrollTop, setScrollTop] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    const el = activeScrollRef?.current;
    if (!el) return;

    const updateMetrics = () => {
      setScrollTop(el.scrollTop);
      if (el.clientHeight > 0) {
        setMeasuredHeight(el.clientHeight);
      }
    };

    updateMetrics();
    el.addEventListener('scroll', updateMetrics, { passive: true });

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateMetrics);
      observer.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', updateMetrics);
      observer?.disconnect();
    };
  }, [activeScrollRef]);

  const totalCount = items.length;
  const rowHeight = Math.max(1, estimateSize);
  const effectiveHeight = measuredHeight > 0 ? measuredHeight : viewportHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.ceil(effectiveHeight / rowHeight) + overscan * 2;
  const endIndex = Math.min(totalCount, startIndex + visibleCount);

  const topPadding = startIndex * rowHeight;
  const bottomPadding = Math.max(0, (totalCount - endIndex) * rowHeight);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <tbody
      data-slot="virtual-table-body"
      aria-rowcount={totalCount}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    >
      {totalCount === 0 ? (
        emptyState ?? null
      ) : (
        <>
          {topPadding > 0 && (
            <tr aria-hidden="true" data-slot="virtual-spacer-top" className="border-0 hover:bg-transparent">
              <td colSpan={999} className="p-0 border-0" style={{ height: topPadding }} />
            </tr>
          )}
          {visibleItems.map((item, offset) => {
            const index = startIndex + offset;
            const key = getRowKey ? getRowKey(item, index) : index;
            return <Fragment key={key}>{renderRow(item, index)}</Fragment>;
          })}
          {bottomPadding > 0 && (
            <tr aria-hidden="true" data-slot="virtual-spacer-bottom" className="border-0 hover:bg-transparent">
              <td colSpan={999} className="p-0 border-0" style={{ height: bottomPadding }} />
            </tr>
          )}
        </>
      )}
    </tbody>
  );
}
VirtualTableBody.displayName = 'VirtualTableBody';
