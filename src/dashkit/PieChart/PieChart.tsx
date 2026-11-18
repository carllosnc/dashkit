import * as React from 'react';
import { useId, Fragment } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { usePieChart } from './usePieChart';

export type PieChartTexture = 'none' | 'striped' | 'dots' | 'grid' | 'gradient';

export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
  texture?: PieChartTexture;
}

const DEFAULT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const defaultFormatter = (value: number) => value.toLocaleString();

export interface PieChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: PieChartDataItem[];
  /** @default 0 */
  innerRadius?: number;
  /** @default true */
  showLabels?: boolean;
  /** @default true */
  showTooltip?: boolean;
  /** @default true */
  animate?: boolean;
  /** @default 'none' */
  texture?: PieChartTexture;
  /** Custom formatter for tooltip values. */
  valueFormatter?: (value: number) => string;
  /** Accessible label for the chart SVG. @default 'Pie chart' */
  ariaLabel?: string;
}

/**
 * Prop-driven (`data`) SVG pie or donut chart with optional inner radius and tooltips.
 *
 * @example
 * ```tsx
 * <PieChart data={[{ label: 'Desktop', value: 65 }, { label: 'Mobile', value: 35 }]} />
 * ```
 */
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  {
    data,
    className,
    innerRadius = 0,
    showLabels = true,
    showTooltip = true,
    animate = true,
    texture = 'none',
    valueFormatter = defaultFormatter,
    ariaLabel = 'Pie chart',
    ...props
  },
  ref
) {
  const chartId = useId().replace(/[^a-zA-Z0-9-_]/g, '');
  const validData = React.useMemo(() => data.map((d, i) => ({
    ...d,
    color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    texture: d.texture || texture,
  })), [data, texture]);

  const {
    hoveredIndex,
    setHoveredIndex,
    tooltipPos,
    containerRef,
    slices,
    handleMouseMove,
    handleTouchMove,
    handleLegendEnter,
    isNearTop,
    total,
    size,
    center
  } = usePieChart({ data: validData, innerRadius, showTooltip });

  if (!data || data.length === 0) return null;

  const hoveredItem = hoveredIndex !== null ? validData[hoveredIndex] : undefined;
  const hoveredPercent =
    hoveredItem && total > 0 ? ((Math.max(0, hoveredItem.value) / total) * 100).toFixed(1) : '0.0';

  return (
    <div
      ref={ref}
      data-slot="pie-chart"
      className={cn('w-full flex flex-col items-center justify-center relative overflow-visible', className)}
      {...props}
    >
      <div ref={containerRef} className="relative w-full aspect-square max-w-[280px] overflow-visible">
        <svg
          role="img"
          aria-label={ariaLabel}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchEnd={() => setHoveredIndex(null)}
        >
          <defs>
            <pattern
              id={`pie-texture-striped-${chartId}`}
              width="12"
              height="12"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="white"
                strokeOpacity="0.25"
                strokeWidth="3.5"
              />
            </pattern>
            <pattern
              id={`pie-texture-dots-${chartId}`}
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="6"
                cy="6"
                r="2"
                fill="white"
                fillOpacity="0.28"
              />
            </pattern>
            <pattern
              id={`pie-texture-grid-${chartId}`}
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="12"
                y2="0"
                stroke="white"
                strokeOpacity="0.22"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="white"
                strokeOpacity="0.22"
                strokeWidth="1.5"
              />
            </pattern>
            <linearGradient
              id={`pie-texture-gradient-${chartId}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.28" />
              <stop offset="100%" stopColor="black" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {slices.map((slice, i) => {
            if (!slice.path) return null;
            const sliceTexture = slice.texture || texture;
            return (
              <Fragment key={i}>
                <motion.path
                  d={slice.path}
                  fill={slice.color}
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeWidth="3"
                  className={cn(
                    'stroke-card text-card transition-opacity duration-200 cursor-pointer',
                    hoveredIndex !== null && hoveredIndex !== i && 'opacity-50'
                  )}
                  style={{
                    zIndex: hoveredIndex === i ? 10 : 1,
                    transformOrigin: `${center}px ${center}px`
                  }}
                  initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { type: 'spring', stiffness: 400, damping: 25 }
                  }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onTouchMove={(e) => handleTouchMove(e, i)}
                />
                {sliceTexture && sliceTexture !== 'none' && (
                  <motion.path
                    d={slice.path}
                    fill={`url(#pie-texture-${sliceTexture}-${chartId})`}
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="stroke-card text-card pointer-events-none"
                    style={{
                      zIndex: hoveredIndex === i ? 10 : 1,
                      transformOrigin: `${center}px ${center}px`
                    }}
                    initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 400, damping: 25 }
                    }}
                  />
                )}
              </Fragment>
            );
          })}
        </svg>

        {showTooltip && hoveredItem && (
          <div
            className={cn(
              'absolute z-50 pointer-events-none transform -translate-x-1/2 bg-popover text-popover-fg ds-rounded shadow-xl border border-border p-3 backdrop-blur-sm flex flex-col gap-1 min-w-[120px] transition-transform duration-200',
              isNearTop ? 'translate-y-3' : '-translate-y-full -mt-3'
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full" style={{ backgroundColor: hoveredItem.color }} />
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{hoveredItem.label}</span>
            </div>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-xs font-bold tabular-nums text-foreground">
                {valueFormatter(hoveredItem.value)}
              </span>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                ({hoveredPercent}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {showLabels && (
        <div className="flex w-full flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
          {validData.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => handleLegendEnter(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                'flex items-center gap-2 transition-opacity duration-200 cursor-default',
                hoveredIndex !== null && hoveredIndex !== i && 'opacity-40'
              )}
            >
              <div className="size-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-medium text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

PieChart.displayName = 'PieChart';
