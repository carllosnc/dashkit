import * as React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface AreaChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface AreaChartProps {
  data: Record<string, string | number>[];
  series: AreaChartSeries[];
  height?: number | string;
  className?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

/**
 * A lightweight, animated Area Chart component built with native SVG that supports multiple series.
 * 
 * @see https://dashkit.com/docs/area-chart
 */
export const AreaChart = ({
  data,
  series,
  height = '100%',
  className,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: AreaChartProps) => {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  
  if (!data || data.length === 0 || !series || series.length === 0) return null;

  // Calculate global max value across all series to normalize scales
  const maxVal = Math.max(
    ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
    0
  ) * 1.1; // 10% padding
  
  const minVal = 0;
  const range = maxVal - minVal;

  const width = 1000;
  const svgHeight = 400;

  const getSeriesPoints = (seriesKey: string) => {
    return data.map((d, i) => {
      const value = Number(d[seriesKey]) || 0;
      const x = (i / (data.length - 1)) * width;
      const y = svgHeight - ((value - minVal) / range) * svgHeight;
      return { x, y, value };
    });
  };

  const allSeriesPoints = series.map(s => ({
    ...s,
    points: getSeriesPoints(s.key)
  }));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * width;
    
    const index = Math.round((normalizedX / width) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    
    setHoveredIndex(clampedIndex);
    
    // Position tooltip above the "highest" point at this X index
    const highestY = Math.min(...allSeriesPoints.map(s => s.points[clampedIndex].y));
    
    // Clamp tooltip position within the container to prevent overflow
    const tooltipWidth = 140; // matches min-w-[140px] plus padding
    const rawX = (clampedIndex / (data.length - 1)) * rect.width;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(rect.width - tooltipWidth / 2 - 8, rawX));

    setTooltipPos({ 
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  };

  const isNearTop = tooltipPos.y < 100;

  return (
    <div 
      className={cn("w-full flex-1 flex flex-col overflow-visible", className)} 
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="relative flex-1 w-full overflow-visible">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
        <defs>
          {series.map(s => (
            <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {/* Grid Lines */}
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

        {/* Vertical hover line */}
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

        {/* Series Paths */}
        {allSeriesPoints.map((s) => {
          const linePath = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
          const areaPath = `${linePath} L ${width} ${svgHeight} L 0 ${svgHeight} Z`;
          
          return (
            <React.Fragment key={s.key}>
              {/* Area fill */}
              <motion.path
                d={areaPath}
                fill={`url(#grad-${s.key})`}
                initial={animate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              {/* Line */}
              <motion.path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={animate ? { pathLength: 0, opacity: 0 } : false}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                vectorEffect="non-scaling-stroke"
              />
            </React.Fragment>
          );
        })}
      </svg>
      
      {/* HTML Dots Overlay - Prevents distortion while keeping alignment */}
      <div className="absolute inset-0 pointer-events-none touch-none">
        {allSeriesPoints.map((s) => (
          s.points.map((p, i) => (
            <motion.div
              key={`${s.key}-${i}`}
              className={cn(
                "absolute rounded-full border-2 transition-all duration-200",
              )}
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

      {/* Tooltip Overlay */}
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
      </div>

      {/* X-Axis Labels */}
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

AreaChart.displayName = 'AreaChart';


