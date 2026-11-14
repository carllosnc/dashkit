import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

import { useAreaChart, type AreaChartSeries } from './useAreaChart';

const DEFAULT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

export interface AreaChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, string | number>[];
  series: AreaChartSeries[];
  height?: number | string;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

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
    ...props
  },
  ref
) {
  const {
    chartRef,
    hoveredIndex,
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    setHoveredIndex,
    isNearTop,
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

  return (
    <div
      ref={ref}
      data-slot="area-chart"
      className={cn("w-full flex-1 flex flex-col min-h-0 overflow-visible", className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height, ...style }}
      {...props}
    >
      <div className="relative flex-1 w-full min-h-0 overflow-visible">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full block overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {allSeriesPoints.map(s => (
              <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
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

          {showTooltip && hoveredIndex !== null && (
            <line
              x1={(hoveredIndex / (data.length - 1)) * width}
              y1="0"
              x2={(hoveredIndex / (data.length - 1)) * width}
              y2={svgHeight}
              className="stroke-border"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {allSeriesPoints.map((s) => {
            const linePath = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            const areaPath = `${linePath} L ${width} ${svgHeight} L 0 ${svgHeight} Z`;

            return (
              <React.Fragment key={s.key}>
                <motion.path
                  d={areaPath}
                  fill={`url(#grad-${s.key})`}
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

        <div className="absolute inset-0 pointer-events-none touch-none">
          {allSeriesPoints.map((s) => (
            s.points.map((p, i) => (
              <motion.div
                key={`${s.key}-${i}`}
                className="absolute rounded-full border-2 transition-all duration-200"
                style={{
                  left: `${(p.x / width) * 100}%`,
                  top: `${(p.y / svgHeight) * 100}%`,
                  width: hoveredIndex === i ? 12 : 8,
                  height: hoveredIndex === i ? 12 : 8,
                  x: "-50%",
                  y: "-50%",
                  backgroundColor: hoveredIndex === i ? s.color : 'var(--color-card, #fff)',
                  borderColor: s.color,
                }}
                initial={animate ? { scale: 0, opacity: 0 } : false}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ delay: (i / data.length) * 0.5 + 1 }}
              />
            ))
          ))}
        </div>

        {showTooltip && hoveredIndex !== null && (
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
                 {data[hoveredIndex].label}
               </span>
            </div>
            {series.map(s => (
              <div key={s.key} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                   <div className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                   <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{s.label}</span>
                </div>
                <span className="text-xs font-bold text-foreground">
                  {Number(data[hoveredIndex][s.key]).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLabels && (
        <div className="flex justify-between mt-3 shrink-0">
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors",
                hoveredIndex === i && "text-foreground"
              )}
            >
              {d.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

AreaChart.displayName = 'AreaChart';
