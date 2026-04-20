import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useBarChart } from './useBarChart';
import './bar-chart.css';

export interface BarChartSeries {
  key: string;
  label: string;
  color?: string;
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
  const {
    chartRef,
    hoveredIndex,
    tooltipPos,
    setHoveredIndex,
    validSeries,
    minVal,
    range,
    width,
    svgHeight,
    groupWidth,
    groupPadding,
    barWidth,
    handleMouseMove,
    isNearTop
  } = useBarChart({ data, series, barGap });

  if (!data || data.length === 0 || !series || series.length === 0) return null;

  return (
    <div
      className={cn('bar-chart', className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <svg
        ref={chartRef}
        viewBox={`0 0 ${width} ${svgHeight}`}
        preserveAspectRatio="none"
        className="bar-chart__svg"
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
            className="bar-chart__grid-line"
            strokeWidth="1"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {data.map((d, dataIdx) => (
          <g key={dataIdx}>
            {validSeries.map((s, seriesIdx) => {
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
                    'bar-chart__bar',
                    hoveredIndex !== null && hoveredIndex !== dataIdx && 'bar-chart__bar--inactive'
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
            'bar-chart__tooltip',
            isNearTop ? "translate-y-4" : "-translate-y-full -mt-12"
          )}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y
          }}
        >
          <div className="bar-chart__tooltip-header">
             <span className="bar-chart__tooltip-header-text">
               {data[hoveredIndex].label}
             </span>
          </div>
          {validSeries.map(s => (
            <div key={s.key} className="bar-chart__tooltip-entry">
              <div className="bar-chart__tooltip-entry-label">
                 <div className="bar-chart__tooltip-entry-dot" style={{ backgroundColor: s.color }} />
                 <span className="bar-chart__tooltip-entry-text">{s.label}</span>
              </div>
              <span className="bar-chart__tooltip-entry-value">
                {Number(data[hoveredIndex][s.key]).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {showLabels && (
        <div className="bar-chart__x-axis">
          {data.map((d, i) => (
            <div key={i} className="bar-chart__x-axis-column">
              <span
                className={cn(
                  'bar-chart__x-axis-label',
                  hoveredIndex === i && 'bar-chart__x-axis-label--active'
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
