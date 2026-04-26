import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { usePieChart } from './usePieChart';
import './pie-chart.css';

export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-primary-400)',
  'var(--color-primary-200)',
  'var(--color-primary-800)',
  'var(--color-primary-300)',
];

export interface PieChartProps {
  data: PieChartDataItem[];
  className?: string;
  innerRadius?: number;
  showLabels?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

export function PieChart({
  data,
  className,
  innerRadius = 0,
  showLabels = true,
  showTooltip = true,
  animate = true,
}: PieChartProps) {
  const validData = React.useMemo(() => data.map((d, i) => ({
    ...d,
    color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  })), [data]);

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
  } = usePieChart({ data: validData, innerRadius, showTooltip });

  if (!data || data.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn('pie-chart', className)}
    >
      <div className="pie-chart__container">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="pie-chart__svg"
        >
          {slices.map((slice, i) => (
            <motion.path
              key={i}
              d={slice.path}
              fill={slice.color}
              stroke="currentColor"
              strokeWidth="3"
              className="pie-chart__slice"
              style={{
                zIndex: hoveredIndex === i ? 10 : 1,
                transformOrigin: `${center}px ${center}px`
              }}
              initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {showTooltip && hoveredIndex !== null && (
          <div
            className={cn(
              'pie-chart__tooltip',
              isNearTop ? 'pie-chart__tooltip--near-top' : 'pie-chart__tooltip--default'
            )}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y
            }}
          >
            <div className="pie-chart__tooltip-header">
               <div className="pie-chart__tooltip-color" style={{ backgroundColor: validData[hoveredIndex].color }} />
               <span className="pie-chart__tooltip-label">{validData[hoveredIndex].label}</span>
            </div>
            <div className="pie-chart__tooltip-value-container">
               <span className="pie-chart__tooltip-value">
                 {validData[hoveredIndex].value.toLocaleString()}
                 <span className="pie-chart__tooltip-percentage">
                   ({((validData[hoveredIndex].value / total) * 100).toFixed(1)}%)
                 </span>
               </span>
            </div>
          </div>
        )}
      </div>
      {showLabels && (
        <div className="pie-chart__legend">
          {validData.map((item, i) => (
            <div
              key={i}
              className={cn(
                'pie-chart__legend-item',
                hoveredIndex !== null && hoveredIndex !== i && 'pie-chart__legend-item--dimmed'
              )}
            >
              <div className="pie-chart__legend-color" style={{ backgroundColor: item.color }} />
              <span className="pie-chart__legend-label">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

PieChart.displayName = 'PieChart';
