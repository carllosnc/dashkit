import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useLineChart } from './useLineChart';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface LineChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface LineChartProps {
  data: Record<string, string | number>[];
  series: LineChartSeries[];
  className?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

export const LineChart = ({
  data,
  series,
  className,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: LineChartProps) => {
  const {
    chartRef,
    hoveredIndex,
    setHoveredIndex,
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    isNearTop,
    width,
    svgHeight
  } = useLineChart({ data, series });

  if (!data || data.length === 0 || !series || series.length === 0) return null;

  return (
    <div className={cn("w-full flex flex-col relative overflow-visible", className)}>
      <div className="relative w-full aspect-[2.5/1] overflow-visible">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
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

            return (
              <motion.path
                key={s.key}
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={animate ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 pointer-events-none touch-none">
          {allSeriesPoints.map((s) => (
            s.points.map((p, i) => (
              <motion.div
                key={`${s.key}-${i}`}
                className={cn("absolute rounded-full border-2 transition-all duration-200")}
                style={{
                  left: `${(p.x / width) * 100}%`,
                  top: `${(p.y / svgHeight) * 100}%`,
                  width: hoveredIndex === i ? 12 : 8,
                  height: hoveredIndex === i ? 12 : 8,
                  x: "-50%",
                  y: "-50%",
                  backgroundColor: hoveredIndex === i ? s.color : '#fff',
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
      </div>

      {showTooltip && hoveredIndex !== null && (
        <div
          className={cn(
            "absolute z-50 pointer-events-none transform -translate-x-1/2 bg-ds-950 text-white rounded-[var(--radius)] border border-ds-800 p-3 shadow-2xl flex flex-col gap-2 min-w-[140px] transition-transform duration-200",
            isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
          )}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y
          }}
        >
          <div className="flex border-b border-ds-800 pb-1 mb-1">
             <span className="text-[10px] font-bold uppercase tracking-widest text-ds-400">
               {data[hoveredIndex].label}
             </span>
          </div>
          {series.map(s => (
            <div key={s.key} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs font-medium text-ds-200 whitespace-nowrap">{s.label}</span>
              </div>
              <span className="text-xs font-bold text-white">
                {Number(data[hoveredIndex][s.key]).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {showLabels && (
        <div className="flex justify-between mt-4">
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
};

LineChart.displayName = 'LineChart';
