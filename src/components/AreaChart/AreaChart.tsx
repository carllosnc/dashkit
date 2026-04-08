import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const CONTAINER_BASE = "w-full flex-1 flex flex-col overflow-visible";
const CHART_WRAPPER = "relative flex-1 w-full overflow-visible";
const SVG_ELEMENT = "w-full h-full overflow-visible";
const GRID_LINE = "stroke-border";
const HOVER_LINE = "stroke-border";
const DOT_OVERLAY = "absolute inset-0 pointer-events-none touch-none";
const DOT_BASE = "absolute rounded-full border-2 transition-all duration-200";
const TOOLTIP_CONTAINER = "absolute z-50 pointer-events-none transform -translate-x-1/2 bg-ds-950 text-white ds-rounded border border-ds-800 p-3 shadow-2xl flex flex-col gap-2 min-w-[140px] transition-transform duration-200";
const TOOLTIP_HEADER = "flex border-b border-ds-800 pb-1 mb-1";
const TOOLTIP_LABEL = "text-[10px] font-bold uppercase tracking-widest text-ds-400";
const TOOLTIP_ROW = "flex items-center justify-between gap-4";
const TOOLTIP_SERIES_INFO = "flex items-center gap-2";
const TOOLTIP_DOT = "size-2 rounded-full";
const TOOLTIP_VALUE_NAME = "text-xs font-medium text-ds-200 whitespace-nowrap";
const TOOLTIP_VALUE = "text-xs font-bold text-white";
const X_AXIS_CONTAINER = "flex justify-between mt-4";
const X_AXIS_LABEL = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors";
const X_AXIS_LABEL_ACTIVE = "text-foreground";

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

export function AreaChart({
  data,
  series,
  height = '100%',
  className,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: AreaChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

  if (!data || data.length === 0 || !series || series.length === 0) {
    return null;
  }

  const maxVal = Math.max(
    ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
    0
  ) * 1.1;

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

    const highestY = Math.min(...allSeriesPoints.map(s => s.points[clampedIndex].y));
    const tooltipWidth = 140;
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
      className={cn(CONTAINER_BASE, className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className={CHART_WRAPPER}>
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className={SVG_ELEMENT}
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

          {showTooltip && hoveredIndex !== null && (
            <line
              x1={(hoveredIndex / (data.length - 1)) * width}
              y1="0"
              x2={(hoveredIndex / (data.length - 1)) * width}
              y2={svgHeight}
              className={HOVER_LINE}
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

        <div className={DOT_OVERLAY}>
          {allSeriesPoints.map((s) => (
            s.points.map((p, i) => (
              <motion.div
                key={`${s.key}-${i}`}
                className={DOT_BASE}
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

        {showTooltip && hoveredIndex !== null && (
          <div
            className={cn(
              TOOLTIP_CONTAINER,
              isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className={TOOLTIP_HEADER}>
               <span className={TOOLTIP_LABEL}>
                 {data[hoveredIndex].label}
               </span>
            </div>
            {series.map(s => (
              <div key={s.key} className={TOOLTIP_ROW}>
                <div className={TOOLTIP_SERIES_INFO}>
                   <div className={TOOLTIP_DOT} style={{ backgroundColor: s.color }} />
                   <span className={TOOLTIP_VALUE_NAME}>{s.label}</span>
                </div>
                <span className={TOOLTIP_VALUE}>
                  {Number(data[hoveredIndex][s.key]).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLabels && (
        <div className={X_AXIS_CONTAINER}>
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                X_AXIS_LABEL,
                hoveredIndex === i && X_AXIS_LABEL_ACTIVE
              )}
            >
              {d.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
