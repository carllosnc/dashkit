import { useId, Fragment } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useBarChart } from './useBarChart';
import './bar-chart.css';

export interface BarChartSeries {
  key: string;
  label: string;
  color?: string;
}

export type BarChartTexture = 'none' | 'striped' | 'dots' | 'grid' | 'gradient';

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
  texture?: BarChartTexture;
  showTrack?: boolean;
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
  texture = 'none',
  showTrack = false,
}: BarChartProps) {
  const chartId = useId().replace(/[^a-zA-Z0-9-_]/g, '');
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
        <defs>
          <pattern
            id={`bar-texture-striped-${chartId}`}
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="white"
              strokeOpacity="0.22"
              strokeWidth="2.5"
            />
          </pattern>
          <pattern
            id={`bar-texture-dots-${chartId}`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="4"
              cy="4"
              r="1.4"
              fill="white"
              fillOpacity="0.25"
            />
          </pattern>
          <pattern
            id={`bar-texture-grid-${chartId}`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient
            id={`bar-texture-gradient-${chartId}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>
        </defs>

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
              const rx = rounded ? Math.min(barWidth / 2, 6) : 0;

              return (
                <Fragment key={s.key}>
                  {showTrack && (
                    <rect
                      x={x}
                      y={0}
                      width={barWidth}
                      height={svgHeight}
                      rx={rx}
                      className="fill-muted/40 dark:fill-muted/20 pointer-events-none"
                    />
                  )}
                  <motion.rect
                    x={x}
                    initial={animate ? { y: svgHeight, height: 0 } : false}
                    animate={{ y, height: barHeight }}
                    width={barWidth}
                    fill={s.color}
                    rx={rx}
                    className={cn(
                      'bar-chart__bar',
                      hoveredIndex !== null && hoveredIndex !== dataIdx && 'bar-chart__bar--inactive'
                    )}
                    style={{ transformOrigin: 'bottom' }}
                    whileHover={{
                      scaleY: 1.03,
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
                  {texture && texture !== 'none' && (
                    <motion.rect
                      x={x}
                      initial={animate ? { y: svgHeight, height: 0 } : false}
                      animate={{ y, height: barHeight }}
                      width={barWidth}
                      fill={`url(#bar-texture-${texture}-${chartId})`}
                      rx={rx}
                      className="pointer-events-none"
                      style={{ transformOrigin: 'bottom' }}
                      whileHover={{
                        scaleY: 1.03,
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
                  )}
                </Fragment>
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
