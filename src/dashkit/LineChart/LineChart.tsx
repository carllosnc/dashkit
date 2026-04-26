import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useLineChart } from './useLineChart';
import './line-chart.css';

export interface LineChartSeries {
  key: string;
  label: string;
  color?: string;
}

const DEFAULT_COLORS = [
  'var(--color-ds-primary-600)',
  'var(--color-ds-primary-400)',
  'var(--color-ds-primary-200)',
  'var(--color-ds-primary-800)',
  'var(--color-ds-primary-300)',
];

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
  const validSeries = React.useMemo(() => series.map((s, i) => ({
    ...s,
    color: s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  })), [series]);

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
  } = useLineChart({ data, series: validSeries });

  if (!data || data.length === 0 || !series || series.length === 0) return null;

  return (
    <div className={cn('line-chart', className)}>
      <div className="line-chart__container">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${width} ${svgHeight}`}
          preserveAspectRatio="none"
          className="line-chart__svg"
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
              className="line-chart__grid-line"
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
              className="line-chart__tooltip-line"
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
                className="line-chart__point"
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
            'line-chart__tooltip',
            isNearTop ? 'line-chart__tooltip--top' : 'line-chart__tooltip--bottom'
          )}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y
          }}
        >
          <div className="line-chart__tooltip-header">
             <span className="line-chart__tooltip-title">
               {data[hoveredIndex].label}
             </span>
          </div>
          {validSeries.map(s => (
            <div key={s.key} className="line-chart__tooltip-item">
              <div className="line-chart__tooltip-item-label-container">
                 <div className="line-chart__tooltip-item-color" style={{ backgroundColor: s.color }} />
                  <span className="line-chart__tooltip-item-label">{s.label}</span>
              </div>
              <span className="line-chart__tooltip-item-value">
                {Number(data[hoveredIndex][s.key]).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {showLabels && (
        <div className="line-chart__labels">
          {data.map((d, i) => (
            <span
              key={i}
              className={cn(
                'line-chart__label',
                hoveredIndex === i && 'line-chart__label--active'
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
