import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { buildLineChartPath, useLineChart } from './useLineChart';

export interface LineChartSeries {
  key: string;
  label: string;
  color?: string;
  strokeDasharray?: string;
  strokeWidth?: number;
}

const DEFAULT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const defaultFormatter = (value: number) => value.toLocaleString();

export interface LineChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, string | number>[];
  series: LineChartSeries[];
  /** Optional explicit height. When omitted, defaults to a 2.5:1 aspect ratio. */
  height?: number | string;
  /** @default true */
  showGrid?: boolean;
  /** @default true */
  showLabels?: boolean;
  /** @default true */
  showTooltip?: boolean;
  /** @default true */
  animate?: boolean;
  /** @default 'linear' */
  curve?: 'linear' | 'smooth';
  /** @default true */
  showDots?: boolean | 'hover';
  /** @default false */
  showYAxis?: boolean;
  /** @default false */
  showLegend?: boolean;
  /** Key in `data` items used for x-axis and tooltip labels. @default 'label' */
  labelKey?: string;
  /** Custom formatter for Y-axis ticks and tooltip values. */
  valueFormatter?: (value: number) => string;
  /** Accessible label for the chart SVG. @default 'Line chart' */
  ariaLabel?: string;
}

/**
 * Prop-driven (`data`, `series`) multi-series SVG line chart with interactive hover tooltips.
 *
 * @example
 * ```tsx
 * <LineChart
 *   data={[{ label: 'Mon', visits: 320 }, { label: 'Tue', visits: 410 }]}
 *   series={[{ key: 'visits', label: 'Visits' }]}
 * />
 * ```
 */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  {
    data,
    series,
    height,
    className,
    style,
    showGrid = true,
    showLabels = true,
    showTooltip = true,
    animate = true,
    curve = 'linear',
    showDots = true,
    showYAxis = false,
    showLegend = false,
    labelKey = 'label',
    valueFormatter = defaultFormatter,
    ariaLabel = 'Line chart',
    ...props
  },
  ref
) {
  const validSeries = React.useMemo(() => series.map((s, i) => ({
    ...s,
    color: s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    strokeWidth: s.strokeWidth ?? 2.5,
  })), [series]);

  const {
    chartRef,
    hoveredIndex,
    setHoveredIndex,
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    handleTouchMove,
    isNearTop,
    maxVal,
    width,
    svgHeight
  } = useLineChart({ data, series: validSeries });

  if (!data || data.length === 0 || !series || series.length === 0) return null;

  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : undefined;
  const hoverLineX =
    hoveredIndex !== null
      ? data.length === 1
        ? width / 2
        : (hoveredIndex / (data.length - 1)) * width
      : 0;
  const yTicks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div
      ref={ref}
      data-slot="line-chart"
      className={cn(
        'w-full flex flex-col relative overflow-visible',
        height !== undefined && 'flex-1 min-h-0',
        className
      )}
      style={
        height !== undefined
          ? { height: typeof height === 'number' ? `${height}px` : height, ...style }
          : style
      }
      {...props}
    >
      <div
        className={cn(
          'relative w-full flex overflow-visible',
          height !== undefined ? 'flex-1 min-h-0' : 'aspect-[2.5/1]'
        )}
      >
        {showYAxis && (
          <div className="flex flex-col justify-between pr-3 py-0.5 shrink-0 select-none text-right">
            {yTicks.map((ratio) => (
              <span
                key={ratio}
                className="text-[10px] font-medium tabular-nums text-muted-foreground leading-none"
              >
                {valueFormatter(Math.round(maxVal * ratio))}
              </span>
            ))}
          </div>
        )}

        <div className="relative flex-1 w-full h-full min-h-0 overflow-visible">
          <svg
            ref={chartRef}
            role="img"
            aria-label={ariaLabel}
            viewBox={`0 0 ${width} ${svgHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full block overflow-visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setHoveredIndex(null)}
          >
            {showGrid && [0.25, 0.5, 0.75, 1].map((line, i) => (
              <line
                key={i}
                x1="0"
                y1={svgHeight * (1 - line)}
                x2={width}
                y2={svgHeight * (1 - line)}
                className="stroke-border"
                strokeWidth="1"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {showTooltip && hoveredItem && (
              <line
                x1={hoverLineX}
                y1="0"
                x2={hoverLineX}
                y2={svgHeight}
                className="stroke-border"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {allSeriesPoints.map((s) => {
              const linePath = buildLineChartPath(s.points, curve, svgHeight);

              return (
                <motion.path
                  key={s.key}
                  d={linePath}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.strokeWidth}
                  strokeDasharray={s.strokeDasharray}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={
                    animate
                      ? s.strokeDasharray
                        ? { opacity: 0 }
                        : { pathLength: 0, opacity: 0 }
                      : false
                  }
                  animate={
                    animate
                      ? s.strokeDasharray
                        ? { opacity: 1 }
                        : { pathLength: 1, opacity: 1 }
                      : undefined
                  }
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {showDots !== false && (
            <div className="absolute inset-0 pointer-events-none touch-none">
              {allSeriesPoints.map((s) => (
                s.points.map((p, i) => {
                  const isActive = hoveredIndex === i;
                  if (showDots === 'hover' && !isActive) return null;

                  return (
                    <motion.div
                      key={`${s.key}-${i}`}
                      className="absolute rounded-full border-2 transition-all duration-200"
                      style={{
                        left: `${(p.x / width) * 100}%`,
                        top: `${(p.y / svgHeight) * 100}%`,
                        width: isActive ? 12 : 8,
                        height: isActive ? 12 : 8,
                        x: "-50%",
                        y: "-50%",
                        backgroundColor: isActive ? s.color : 'var(--color-card, #fff)',
                        borderColor: s.color,
                      }}
                      initial={animate && showDots === true ? { scale: 0, opacity: 0 } : false}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={showDots === 'hover' ? { duration: 0.12 } : { delay: (i / data.length) * 0.5 + 1 }}
                    />
                  );
                })
              ))}
            </div>
          )}

          {showTooltip && hoveredItem && (
            <div
              className={cn(
                'absolute z-50 pointer-events-none transform -translate-x-1/2 bg-popover text-popover-fg ds-rounded border border-border p-3 shadow-xl backdrop-blur-sm flex flex-col gap-2 min-w-[140px] transition-transform duration-200',
                isNearTop ? 'translate-y-4' : '-translate-y-full -mt-12'
              )}
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y
              }}
            >
              <div className="flex border-b border-border pb-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {hoveredItem[labelKey] ?? hoveredItem.label}
                </span>
              </div>
              {validSeries.map(s => (
                <div key={s.key} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{s.label}</span>
                  </div>
                  <span className="text-xs font-bold tabular-nums text-foreground">
                    {valueFormatter(Number(hoveredItem[s.key]) || 0)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showLabels && (
        <div className={cn("flex justify-between mt-4 shrink-0", showYAxis && "pl-10")}>
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                'text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors',
                hoveredIndex === i && 'text-foreground'
              )}
            >
              {d[labelKey] ?? d.label}
            </span>
          ))}
        </div>
      )}

      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-3 shrink-0">
          {validSeries.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

LineChart.displayName = 'LineChart';
