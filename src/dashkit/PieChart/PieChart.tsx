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

export interface PieChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: PieChartDataItem[];
  innerRadius?: number;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  texture?: PieChartTexture;
}

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  {
    data,
    className,
    innerRadius = 0,
    showLabels = true,
    showTooltip = true,
    animate = true,
    texture = 'none',
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
    isNearTop,
    total,
    size,
    center
  } = usePieChart({ data: validData, innerRadius, showTooltip });

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [containerRef, ref]
  );

  if (!data || data.length === 0) return null;

  return (
    <div
      ref={setRootRef}
      data-slot="pie-chart"
      className={cn('w-full flex flex-col items-center justify-center relative overflow-visible', className)}
      {...props}
    >
      <div className="relative w-full aspect-square max-w-[280px] overflow-visible">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
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
            const sliceTexture = slice.texture || texture;
            return (
              <Fragment key={i}>
                <motion.path
                  d={slice.path}
                  fill={slice.color}
                  stroke="currentColor"
                  strokeWidth="3"
                  className="stroke-card text-card transition-colors duration-200 cursor-pointer"
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
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {sliceTexture && sliceTexture !== 'none' && (
                  <motion.path
                    d={slice.path}
                    fill={`url(#pie-texture-${sliceTexture}-${chartId})`}
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

        {showTooltip && hoveredIndex !== null && (
          <div
            className={cn(
              'absolute z-50 pointer-events-none transform -translate-x-1/2 bg-popover text-popover-fg ds-rounded shadow-xl border border-border p-3 flex flex-col gap-1 min-w-[120px] transition-transform duration-200',
              isNearTop ? 'translate-y-4' : '-translate-y-full -mt-8'
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className="flex items-center gap-2">
               <div className="size-2 rounded-full" style={{ backgroundColor: validData[hoveredIndex].color }} />
               <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{validData[hoveredIndex].label}</span>
            </div>
            <div className="flex border-b border-border pb-1 mt-1 mb-1">
               <span className="text-xs font-bold text-foreground">
                 {validData[hoveredIndex].value.toLocaleString()}
                 <span className="ml-1 opacity-50 font-normal">
                   ({((validData[hoveredIndex].value / total) * 100).toFixed(1)}%)
                 </span>
               </span>
            </div>
          </div>
        )}
      </div>
      {showLabels && (
        <div className="flex w-full flex-wrap justify-center gap-x-6 gap-y-2">
          {validData.map((item, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2 transition-opacity duration-200',
                hoveredIndex !== null && hoveredIndex !== i && 'opacity-40'
              )}
            >
              <div className="size-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-bold uppercase text-muted-foreground first-letter:uppercase !tracking-normal">
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
