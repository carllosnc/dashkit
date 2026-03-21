import * as React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartProps {
  data: AreaChartDataPoint[];
  height?: number | string;
  className?: string;
  color?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

/**
 * A lightweight, animated Area Chart component built with native SVG.
 * 
 * @see https://dashkit-ui.com/docs/area-chart
 */
export const AreaChart = ({
  data,
  height = '100%',
  className,
  color = 'currentColor', // Defaults to text color
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: AreaChartProps) => {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.value), 0) * 1.1; // 10% padding
  const minVal = 0; // Fixed at 0 for area charts usually
  const range = maxVal - minVal;

  const width = 1000; // Fixed viewBox width for better coordinate math
  const svgHeight = 400; // Fixed viewBox height

  const getPoints = () => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = svgHeight - ((d.value - minVal) / range) * svgHeight;
      return { x, y };
    });
  };

  const points = getPoints();
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${svgHeight} L 0 ${svgHeight} Z`;

  // Grid lines (horizontal)
  const gridLines = [0.25, 0.5, 0.75, 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * width;
    
    // Find nearest point
    const index = Math.round((normalizedX / width) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    
    setHoveredIndex(clampedIndex);
    setTooltipPos({ 
      x: (clampedIndex / (data.length - 1)) * rect.width,
      y: (points[clampedIndex].y / svgHeight) * rect.height
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
        className="flex-1 w-full overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {showGrid && gridLines.map((line, i) => (
          <line
            key={i}
            x1="0"
            y1={svgHeight * (1 - line)}
            x2={width}
            y2={svgHeight * (1 - line)}
            className="stroke-layout-divider dark:stroke-layout-dark-divider"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Vertical hover line */}
        {showTooltip && hoveredIndex !== null && (
          <line
            x1={points[hoveredIndex].x}
            y1="0"
            x2={points[hoveredIndex].x}
            y2={svgHeight}
            className="stroke-base-300 dark:stroke-base-700"
            strokeWidth="2"
          />
        )}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data points (dots) */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? "10" : "6"}
            fill={hoveredIndex === i ? color : "var(--color-block-bg)"}
            className={cn(
              "stroke-current transition-all duration-200",
              hoveredIndex === i ? "fill-current" : "dark:fill-block-dark-bg"
            )}
            stroke={color}
            strokeWidth="3"
            initial={animate ? { scale: 0, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (i / data.length) * 0.5 + 1 }}
          />
        ))}
      </svg>

      {/* Tooltip Overlay */}
      {showTooltip && hoveredIndex !== null && (
        <div 
          className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 bg-block-bg dark:bg-block-dark-bg border border-block-border dark:border-block-dark-border rounded-md px-3 py-2 shadow-xl flex flex-col gap-1 min-w-[100px]"
          style={{ 
            left: tooltipPos.x, 
            top: tooltipPos.y - 10
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-base-500">
            {data[hoveredIndex].label}
          </span>
          <span className="text-sm font-bold text-base-950 dark:text-white">
            {data[hoveredIndex].value.toLocaleString()}
          </span>
        </div>
      )}

      {/* X-Axis Labels */}
      {showLabels && (
        <div className="flex justify-between mt-4">
          {data.map((d, i) => (
            <span 
              key={i} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-colors",
                hoveredIndex === i ? "text-base-950 dark:text-white" : "text-base-400"
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
