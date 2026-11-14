import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

import { buildAreaLinePath, useAreaChart, type AreaChartSeries } from './useAreaChart';

const DEFAULT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const defaultFormatter = (value: number) => value.toLocaleString();

export interface AreaChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, string | number>[];
  series: AreaChartSeries[];
  /** @default '100%' */
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
  /** Accessible label for the chart SVG. @default 'Area chart' */
  ariaLabel?: string;
}

/**
 * Prop-driven (`data`, `series`) responsive SVG area chart with grid, labels, and interactive tooltips.
 *
 * @example
 * ```tsx
 * <AreaChart
 *   data={[{ label: 'Jan', revenue: 4200 }, { label: 'Feb', revenue: 5100 }]}
 *   series={[{ key: 'revenue', label: 'Revenue' }]}
 * />
 * ```
 */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(function AreaChart(
  {
    data,
    series,
    height = '100%',
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
    ariaLabel = 'Area chart',
    ...props
  },
  ref
) {
  const chartId = React.useId().replace(/[^a-zA-Z0-9-_]/g, '');
  const {
    chartRef,
    hoveredIndex,
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    handleTouchMove,
    setHoveredIndex,
    isNearTop,
    maxVal,
    width,
    svgHeight
  } = useAreaChart({
    data,
    series,
    defaultColors: DEFAULT_COLORS
  });

  if (!data || data.length === 0 || !series || series.length === 0) {
    return null;
  }

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
      data-slot="area-chart"
      className={cn("w-full flex-1 flex flex-col min-h-0 overflow-visible", className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height, ...style }}
      {...props}
    >
      <div className="relative flex-1 flex min-h-0 w-full overflow-visible">
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

        <div className="relative flex-1 w-full min-h-0 overflow-visible">
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
            <defs>
              {allSeriesPoints.map(s => (
                <linearGradient key={`grad-${s.key}-${chartId}`} id={`grad-${s.key}-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={s.fillOpacity} style={{ stopColor: s.color }} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} style={{ stopColor: s.color }} />
                </linearGradient>
              ))}
            </defs>

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
              const linePath = buildAreaLinePath(s.points, curve, svgHeight);
              const firstX = s.points[0]?.x ?? 0;
              const lastX = s.points[s.points.length - 1]?.x ?? width;
              const areaPath = `${linePath} L ${lastX} ${svgHeight} L ${firstX} ${svgHeight} Z`;

              return (
                <React.Fragment key={s.key}>
                  <motion.path
                    d={areaPath}
                    fill={`url(#grad-${s.key}-${chartId})`}
                    initial={animate ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.strokeWidth}
                    strokeDasharray={s.strokeDasharray}
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    vectorEffect="non-scaling-stroke"
                  />
                </React.Fragment>
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
                "absolute z-50 pointer-events-none transform -translate-x-1/2 bg-popover text-popover-fg ds-rounded border border-border p-3 shadow-xl backdrop-blur-sm flex flex-col gap-2 min-w-[140px] transition-transform duration-200",
                isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
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
              {allSeriesPoints.map(s => (
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
        <div className={cn("flex justify-between mt-3 shrink-0", showYAxis && "pl-10")}>
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors",
                hoveredIndex === i && "text-foreground"
              )}
            >
              {d[labelKey] ?? d.label}
            </span>
          ))}
        </div>
      )}

      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-3 shrink-0">
          {allSeriesPoints.map((s) => (
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

AreaChart.displayName = 'AreaChart';
