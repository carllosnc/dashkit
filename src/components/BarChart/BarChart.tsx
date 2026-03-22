import * as React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface BarChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface BarChartProps {
  data: Record<string, string | number>[];
  series: BarChartSeries[];
  height?: number | string;
  className?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  barGap?: number;
  rounded?: boolean;
}

/**
 * A lightweight, animated Bar Chart component built with native SVG that supports grouped bars.
 * 
 * @see https://dashkit-ui.com/docs/bar-chart
 */
export const BarChart = ({
  data,
  series,
  height = '100%',
  className,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  animate = true,
  barGap = 4,
  rounded = true,
}: BarChartProps) => {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  
  if (!data || data.length === 0 || !series || series.length === 0) return null;

  // Calculate global max value across all series
  const maxVal = Math.max(
    ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
    0
  ) * 1.1; 
  
  const minVal = 0;
  const range = maxVal - minVal;

  const width = 1000;
  const svgHeight = 400;

  // Each group takes up an equal segment of the total width
  const groupWidth = width / data.length;
  
  // The content (bars) inside the group should have some padding
  const barsContainerWidth = groupWidth * 0.8;
  const groupPadding = (groupWidth - barsContainerWidth) / 2;
  
  // Individual bar width based on available container space and gaps
  const barWidth = (barsContainerWidth - (series.length - 1) * barGap) / series.length;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * width;
    
    const index = Math.floor(normalizedX / groupWidth);
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    
    setHoveredIndex(clampedIndex);
    
    // Position tooltip above the center of the group
    const tooltipWidth = 140;
    const centerX = clampedIndex * groupWidth + groupWidth / 2;
    const tooltipX = (centerX / width) * rect.width;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(rect.width - tooltipWidth / 2 - 8, tooltipX));

    // For Y, we use the tallest bar in the group
    const groupMaxVal = Math.max(...series.map(s => Number(data[clampedIndex][s.key]) || 0), 0);
    const highestY = svgHeight - ((groupMaxVal - minVal) / range) * svgHeight;

    setTooltipPos({ 
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  };

  return (
    <div 
      className={cn("w-full flex-1 flex flex-col relative", className)} 
      style={{ height }}
    >
      <svg
        ref={chartRef}
        viewBox={`0 0 ${width} ${svgHeight}`}
        preserveAspectRatio="none"
        className="flex-1 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Grid Lines */}
        {showGrid && [0.25, 0.5, 0.75, 1].map((line, i) => (
          <line
            key={i}
            x1="0"
            y1={svgHeight * (1 - line)}
            x2={width}
            y2={svgHeight * (1 - line)}
            className="ds-chart-grid"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Bars */}
        {data.map((d, dataIdx) => (
          <g key={dataIdx}>
            {series.map((s, seriesIdx) => {
              const value = Number(d[s.key]) || 0;
              const barHeight = ((value - minVal) / range) * svgHeight;
              const x = dataIdx * groupWidth + groupPadding + seriesIdx * (barWidth + barGap);
              const y = svgHeight - barHeight;

              return (
                <motion.rect
                  key={s.key}
                  x={x}
                  initial={animate ? { y: svgHeight, height: 0 } : false}
                  animate={{ y, height: barHeight }}
                  width={barWidth}
                  fill={s.color}
                  rx={rounded ? Math.min(barWidth / 2, 4) : 0}
                  className={cn(
                    "transition-opacity duration-200",
                    hoveredIndex !== null && hoveredIndex !== dataIdx && "opacity-40"
                  )}
                  transition={{ 
                    duration: 0.8, 
                    delay: (dataIdx / data.length) * 0.3 + seriesIdx * 0.05,
                    type: "spring",
                    damping: 15,
                    stiffness: 100
                  }}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      {showTooltip && hoveredIndex !== null && (
        <div 
          className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-6 ds-chart-tooltip"
          style={{ 
            left: tooltipPos.x, 
            top: tooltipPos.y - 10
          }}
        >
          <div className="ds-chart-tooltip-header">
             <span className="ds-chart-tooltip-title">
               {data[hoveredIndex].label}
             </span>
          </div>
          {series.map(s => (
            <div key={s.key} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                 <span className="ds-chart-tooltip-label">{s.label}</span>
              </div>
              <span className="ds-chart-tooltip-value">
                {Number(data[hoveredIndex][s.key]).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* X-Axis Labels */}
      {showLabels && (
        <div className="flex w-full mt-4">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span 
                className={cn(
                  "ds-chart-label transition-colors inline-block",
                  hoveredIndex === i && "ds-chart-label-active"
                )}
              >
                {d.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

BarChart.displayName = 'BarChart';
