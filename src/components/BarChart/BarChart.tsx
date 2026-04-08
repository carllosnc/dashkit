import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

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

const CONTAINER_ROOT = "w-full flex-1 flex flex-col relative overflow-visible";
const SVG_ROOT = "flex-1 w-full overflow-visible";
const GRID_LINE = "stroke-border";
const BAR_BASE = "transition-opacity duration-200 cursor-pointer";
const BAR_INACTIVE = "opacity-40";
const TOOLTIP_ROOT = "absolute z-50 pointer-events-none transform -translate-x-1/2 bg-ds-950 text-white ds-rounded shadow-2xl border border-ds-800 p-3 flex flex-col gap-2 min-w-[140px] transition-transform duration-200";
const TOOLTIP_HEADER = "flex border-b border-ds-800 pb-1 mb-1";
const TOOLTIP_HEADER_TEXT = "text-[10px] font-bold uppercase tracking-widest text-ds-400";
const TOOLTIP_ENTRY = "flex items-center justify-between gap-4";
const TOOLTIP_ENTRY_LABEL = "flex items-center gap-2";
const TOOLTIP_ENTRY_DOT = "size-2 rounded-full";
const TOOLTIP_ENTRY_TEXT = "text-xs font-medium text-ds-200 whitespace-nowrap";
const TOOLTIP_ENTRY_VALUE = "text-xs font-bold text-white";
const X_AXIS_ROOT = "flex w-full mt-4";
const X_AXIS_COLUMN = "flex-1 text-center";
const X_AXIS_LABEL = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors inline-block";
const X_AXIS_LABEL_ACTIVE = "text-foreground";

export function BarChart({
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
}: BarChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

  if (!data || data.length === 0 || !series || series.length === 0) return null;

  const maxVal = Math.max(
    ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
    0
  ) * 1.1;

  const minVal = 0;
  const range = maxVal - minVal;
  const width = 1000;
  const svgHeight = 400;

  const groupWidth = width / data.length;
  const barsContainerWidth = groupWidth * 0.8;
  const groupPadding = (groupWidth - barsContainerWidth) / 2;
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

    const tooltipWidth = 140;
    const centerX = clampedIndex * groupWidth + groupWidth / 2;
    const tooltipX = (centerX / width) * rect.width;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(rect.width - tooltipWidth / 2 - 8, tooltipX));

    const groupMaxVal = Math.max(...series.map(s => Number(data[clampedIndex][s.key]) || 0), 0);
    const highestY = svgHeight - ((groupMaxVal - minVal) / range) * svgHeight;

    setTooltipPos({
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  };

  const isNearTop = tooltipPos.y < 100;

  return (
    <div
      className={cn(CONTAINER_ROOT, className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <svg
        ref={chartRef}
        viewBox={`0 0 ${width} ${svgHeight}`}
        preserveAspectRatio="none"
        className={SVG_ROOT}
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
            className={GRID_LINE}
            strokeWidth="1"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}

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
                    BAR_BASE,
                    hoveredIndex !== null && hoveredIndex !== dataIdx && BAR_INACTIVE
                  )}
                  style={{ transformOrigin: 'bottom' }}
                  whileHover={{
                    scaleY: 1.05,
                    transition: { duration: 0.2 }
                  }}
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

      {showTooltip && hoveredIndex !== null && (
        <div
          className={cn(
            TOOLTIP_ROOT,
            isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
          )}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y
          }}
        >
          <div className={TOOLTIP_HEADER}>
             <span className={TOOLTIP_HEADER_TEXT}>
               {data[hoveredIndex].label}
             </span>
          </div>
          {series.map(s => (
            <div key={s.key} className={TOOLTIP_ENTRY}>
              <div className={TOOLTIP_ENTRY_LABEL}>
                 <div className={TOOLTIP_ENTRY_DOT} style={{ backgroundColor: s.color }} />
                 <span className={TOOLTIP_ENTRY_TEXT}>{s.label}</span>
              </div>
              <span className={TOOLTIP_ENTRY_VALUE}>
                {Number(data[hoveredIndex][s.key]).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {showLabels && (
        <div className={X_AXIS_ROOT}>
          {data.map((d, i) => (
            <div key={i} className={X_AXIS_COLUMN}>
              <span
                className={cn(
                  X_AXIS_LABEL,
                  hoveredIndex === i && X_AXIS_LABEL_ACTIVE
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
}
