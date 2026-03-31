import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { usePieChart } from './usePieChart';

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
  } = usePieChart({ data, innerRadius, showTooltip });

  if (!data || data.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn("w-full flex flex-col items-center justify-center relative overflow-visible", className)}
    >
      <div className="relative w-full aspect-square max-w-[280px] overflow-visible">
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
              className="text-white dark:text-ds-950 transition-colors duration-200 cursor-pointer"
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
            className={cn(
              "absolute z-50 pointer-events-none transform -translate-x-1/2 bg-ds-950 text-white ds-rounded shadow-2xl border border-ds-800 p-3 flex flex-col gap-1 min-w-[120px] transition-transform duration-200",
              isNearTop ? "translate-y-4" : "-translate-y-full -mt-8"
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className="flex items-center gap-2">
               <div className="size-2 rounded-full" style={{ backgroundColor: data[hoveredIndex].color }} />
               <span className="text-xs font-medium text-ds-200 whitespace-nowrap">{data[hoveredIndex].label}</span>
            </div>
            <div className="flex border-b border-ds-800 pb-1 mt-1 mb-1">
               <span className="text-xs font-bold text-white">
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
