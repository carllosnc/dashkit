import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

import './area-chart.css';

import { useAreaChart, type AreaChartSeries } from './useAreaChart';

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-primary-400)',
  'var(--color-primary-200)',
  'var(--color-primary-800)',
  'var(--color-primary-300)',
];

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
      className={cn("area-chart", className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="area-chart__wrapper">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className="area-chart__svg"
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
              className="area-chart__grid-line"
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
              className="area-chart__hover-line"
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

        <div className="area-chart__dot-overlay">
          {allSeriesPoints.map((s) => (
            s.points.map((p, i) => (
              <motion.div
                key={`${s.key}-${i}`}
                className="area-chart__dot"
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
              "area-chart__tooltip",
              isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className="area-chart__tooltip-header">
               <span className="area-chart__tooltip-label">
                 {data[hoveredIndex].label}
               </span>
            </div>
            {series.map(s => (
              <div key={s.key} className="area-chart__tooltip-row">
                <div className="area-chart__tooltip-series">
                   <div className="area-chart__tooltip-dot" style={{ backgroundColor: s.color }} />
                   <span className="area-chart__tooltip-value-name">{s.label}</span>
                </div>
                <span className="area-chart__tooltip-value">
                  {Number(data[hoveredIndex][s.key]).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLabels && (
        <div className="area-chart__x-axis">
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                "area-chart__x-axis-label",
                hoveredIndex === i && "area-chart__x-axis-label--active"
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
