import * as React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface PieChartDataItem {
  label: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  className?: string;
  innerRadius?: number;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

export const PieChart = ({
  data,
  className,
  innerRadius = 0,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: PieChartProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const holeRadius = radius * innerRadius;

  const slices = data.reduce((acc, item) => {
    const { slices: currentSlices, currentAngle } = acc;
    const angle = (item.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const x3 = center + holeRadius * Math.cos(endAngle);
    const y3 = center + holeRadius * Math.sin(endAngle);
    const x4 = center + holeRadius * Math.cos(startAngle);
    const y4 = center + holeRadius * Math.sin(startAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${holeRadius} ${holeRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    return {
      slices: [...currentSlices, { ...item, path, startAngle, endAngle }],
      currentAngle: endAngle
    };
  }, {
    slices: [] as (PieChartDataItem & { path: string, startAngle: number, endAngle: number })[],
    currentAngle: -Math.PI / 2
  }).slices;

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!showTooltip || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn("w-full flex flex-col items-center justify-center relative", className)}
    >
      <div className="relative w-full aspect-square">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          {slices.map((slice, i) => (
            <motion.path
              key={i}
              d={slice.path}
              fill={slice.color}
              stroke="currentColor"
              strokeWidth="3"
              className="text-white dark:text-neutral-950 transition-colors duration-200 cursor-pointer"
              style={{
                zIndex: hoveredIndex === i ? 10 : 1,
                transformOrigin: `${center}px ${center}px`
              }}
              initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {showTooltip && hoveredIndex !== null && (
          <div
            className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 bg-card text-card-foreground rounded-lg shadow-2xl border border-border p-3 flex flex-col gap-1 min-w-[120px]"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 10
            }}
          >
            <div className="flex items-center gap-2">
               <div className="size-2 rounded-full" style={{ backgroundColor: data[hoveredIndex].color }} />
               <span className="text-xs font-medium text-foreground/80 whitespace-nowrap">{data[hoveredIndex].label}</span>
            </div>
            <div className="flex border-b border-border pb-1 mt-1 mb-1">
               <span className="text-xs font-bold text-foreground">
                 {data[hoveredIndex].value.toLocaleString()}
                 <span className="ml-1 opacity-50 font-normal">
                   ({((data[hoveredIndex].value / total) * 100).toFixed(1)}%)
                 </span>
               </span>
            </div>
          </div>
        )}
      </div>
      {showLabels && (
        <div className="flex w-full flex-wrap justify-center gap-x-6 gap-y-2">
          {data.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 transition-opacity duration-200",
                hoveredIndex !== null && hoveredIndex !== i && "opacity-40"
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
};

PieChart.displayName = 'PieChart';


