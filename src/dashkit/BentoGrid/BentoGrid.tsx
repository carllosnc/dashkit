import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

export type BentoBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';
export type BentoResponsiveValue<T> = T | Partial<Record<BentoBreakpoint, T>>;

export type BentoCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type BentoColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
export type BentoRowSpan = 1 | 2 | 3 | 4 | 5 | 6;
export type BentoGap = 'none' | 'sm' | 'md' | 'lg';
export type BentoRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type BentoSurface = 'card' | 'background' | 'muted' | 'transparent';
export type BentoPadding = 'none' | 'sm' | 'md' | 'lg';

const COLS_MAP: Record<BentoBreakpoint, Record<BentoCols, string>> = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
    12: 'sm:grid-cols-12',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    12: 'md:grid-cols-12',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  },
  xl: {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
    12: 'xl:grid-cols-12',
  },
};

const COL_SPAN_MAP: Record<BentoBreakpoint, Record<BentoColSpan, string>> = {
  base: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
    full: 'col-span-full',
  },
  sm: {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
    full: 'sm:col-span-full',
  },
  md: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
    full: 'md:col-span-full',
  },
  lg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
    full: 'lg:col-span-full',
  },
  xl: {
    1: 'xl:col-span-1',
    2: 'xl:col-span-2',
    3: 'xl:col-span-3',
    4: 'xl:col-span-4',
    5: 'xl:col-span-5',
    6: 'xl:col-span-6',
    7: 'xl:col-span-7',
    8: 'xl:col-span-8',
    9: 'xl:col-span-9',
    10: 'xl:col-span-10',
    11: 'xl:col-span-11',
    12: 'xl:col-span-12',
    full: 'xl:col-span-full',
  },
};

const ROW_SPAN_MAP: Record<BentoBreakpoint, Record<BentoRowSpan, string>> = {
  base: {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
  },
  sm: {
    1: 'sm:row-span-1',
    2: 'sm:row-span-2',
    3: 'sm:row-span-3',
    4: 'sm:row-span-4',
    5: 'sm:row-span-5',
    6: 'sm:row-span-6',
  },
  md: {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
    4: 'md:row-span-4',
    5: 'md:row-span-5',
    6: 'md:row-span-6',
  },
  lg: {
    1: 'lg:row-span-1',
    2: 'lg:row-span-2',
    3: 'lg:row-span-3',
    4: 'lg:row-span-4',
    5: 'lg:row-span-5',
    6: 'lg:row-span-6',
  },
  xl: {
    1: 'xl:row-span-1',
    2: 'xl:row-span-2',
    3: 'xl:row-span-3',
    4: 'xl:row-span-4',
    5: 'xl:row-span-5',
    6: 'xl:row-span-6',
  },
};

const BREAKPOINT_ORDER: BentoBreakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

function resolveColsClasses(cols: BentoResponsiveValue<BentoCols>): string {
  if (typeof cols === 'number') {
    if (cols === 1) return COLS_MAP.base[1];
    return `${COLS_MAP.base[1]} ${COLS_MAP.md[cols]}`;
  }

  return BREAKPOINT_ORDER.map((bp) => {
    const val = cols[bp];
    return val !== undefined ? COLS_MAP[bp][val] : '';
  })
    .filter(Boolean)
    .join(' ');
}

function resolveColSpanClasses(colSpan: BentoResponsiveValue<BentoColSpan>): string {
  if (typeof colSpan === 'number' || colSpan === 'full') {
    if (colSpan === 1) return COL_SPAN_MAP.base[1];
    if (colSpan === 'full') return COL_SPAN_MAP.base.full;
    return `${COL_SPAN_MAP.base.full} ${COL_SPAN_MAP.md[colSpan]}`;
  }

  return BREAKPOINT_ORDER.map((bp) => {
    const val = colSpan[bp];
    return val !== undefined ? COL_SPAN_MAP[bp][val] : '';
  })
    .filter(Boolean)
    .join(' ');
}

function resolveRowSpanClasses(rowSpan: BentoResponsiveValue<BentoRowSpan>): string {
  if (typeof rowSpan === 'number') {
    if (rowSpan === 1) return ROW_SPAN_MAP.base[1];
    return `${ROW_SPAN_MAP.base[1]} ${ROW_SPAN_MAP.md[rowSpan]}`;
  }

  return BREAKPOINT_ORDER.map((bp) => {
    const val = rowSpan[bp];
    return val !== undefined ? ROW_SPAN_MAP[bp][val] : '';
  })
    .filter(Boolean)
    .join(' ');
}

const bentoGridVariants = cva('grid w-full font-sans', {
  variants: {
    gap: {
      none: 'gap-px bg-border overflow-hidden',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
    bordered: {
      true: '',
      false: 'border-0',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  compoundVariants: [
    {
      gap: 'none',
      bordered: true,
      className: 'border border-border',
    },
  ],
  defaultVariants: {
    gap: 'none',
    bordered: true,
    rounded: 'xl',
  },
});

const bentoGridItemVariants = cva(
  'relative flex flex-col min-w-0 text-card-foreground transition-colors',
  {
    variants: {
      surface: {
        card: 'bg-card text-card-foreground',
        background: 'bg-background text-foreground',
        muted: 'bg-muted/60 dark:bg-muted/40 text-foreground',
        transparent: 'bg-transparent text-foreground',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      divided: {
        true: 'ring-1 ring-border',
        false: 'border border-border rounded-xl',
      },
    },
    defaultVariants: {
      surface: 'card',
      padding: 'md',
      divided: true,
    },
  }
);

interface BentoGridContextValue {
  divided: boolean;
}

const BentoGridContext = React.createContext<BentoGridContextValue>({
  divided: true,
});

export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StrictVariantProps<typeof bentoGridVariants> {
  cols?: BentoResponsiveValue<BentoCols>;
  autoRows?: string;
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  function BentoGrid(
    {
      cols = 3,
      gap = 'none',
      bordered = true,
      rounded = 'xl',
      autoRows,
      style,
      className,
      children,
      ...props
    },
    ref
  ) {
    const divided = (gap ?? 'none') === 'none';
    const mergedStyle = autoRows ? { gridAutoRows: autoRows, ...style } : style;

    return (
      <BentoGridContext.Provider value={{ divided }}>
        <div
          ref={ref}
          data-slot="bento-grid"
          style={mergedStyle}
          className={cn(
            bentoGridVariants({ gap, bordered, rounded }),
            resolveColsClasses(cols),
            className
          )}
          {...props}
        >
          {children}
        </div>
      </BentoGridContext.Provider>
    );
  }
);

BentoGrid.displayName = 'BentoGrid';

export interface BentoGridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<StrictVariantProps<typeof bentoGridItemVariants>, 'divided'> {
  colSpan?: BentoResponsiveValue<BentoColSpan>;
  rowSpan?: BentoResponsiveValue<BentoRowSpan>;
}

export const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  function BentoGridItem(
    {
      colSpan = 1,
      rowSpan = 1,
      surface = 'card',
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) {
    const { divided } = React.useContext(BentoGridContext);

    return (
      <div
        ref={ref}
        data-slot="bento-grid-item"
        className={cn(
          bentoGridItemVariants({ surface, padding, divided }),
          resolveColSpanClasses(colSpan),
          resolveRowSpanClasses(rowSpan),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoGridItem.displayName = 'BentoGridItem';
