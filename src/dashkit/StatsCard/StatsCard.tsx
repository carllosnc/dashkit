import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Card } from '../Card/Card';
import { AnimateNumber } from '../AnimateNumber/AnimateNumber';
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from 'react-icons/hi2';
import { Divider } from '../Divider/Divider';
import './stats-card.css';

export interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  status?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  animate?: boolean;
  className?: string;
  chart?: {
    data: number[];
    color?: string;
  };
}

const STATUS_ICONS: Record<string, React.ElementType> = {
  success: HiOutlineArrowTrendingUp,
  danger: HiOutlineArrowTrendingDown,
  warning: HiOutlineArrowTrendingUp,
  info: HiOutlineArrowTrendingUp,
  neutral: HiOutlineArrowTrendingUp,
};

export function StatsCard({
  title,
  value,
  prefix = "",
  suffix = "",
  precision = 0,
  trend,
  trendLabel,
  icon,
  description,
  status = 'neutral',
  animate = false,
  className,
  chart
}: StatsCardProps) {
  const TrendIcon = STATUS_ICONS[status];

  const sparklinePoints = React.useMemo(() => {
    if (!chart || !chart.data.length) return "";
    const min = Math.min(...chart.data);
    const max = Math.max(...chart.data);
    const range = max - min || 1;
    const width = 100;
    const height = 40;

    return chart.data.map((val, i) => {
      const x = (i / (chart.data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [chart]);

  return (
    <Card
      className={cn('stats-card', 'pb-0', className)}
      animate={animate}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 overflow-hidden">
          <p className="stats-card__title">{title}</p>
          <div className="stats-card__value-container">
            <span className="stats-card__value">
              <AnimateNumber
                value={value}
                prefix={prefix}
                suffix={suffix}
                precision={precision}
              />
            </span>
            {typeof trend === 'number' && (
              <div className="stats-card__trend">
                <span className={cn('stats-card__trend-badge', `stats-card--${status}`)}>
                  <TrendIcon className="size-3.5" />
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
                {trendLabel && (
                  <span className="stats-card__trend-label">
                    {trendLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {icon && icon}
      </div>

      {description && (
        <div>
          <Divider variant="dashed" className="w-auto mb-[16px]" />
          <p className="stats-card__description">{description}</p>
        </div>
      )}

      <div className="stats-card__chart-container">
        {chart && (
          <svg
            viewBox="0 0 100 40"
            className={cn('stats-card__chart-svg', !chart.color && `stats-card--${status}`)}
            style={chart.color ? { color: chart.color } : undefined}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`spark-grad-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <motion.path
              d={`${sparklinePoints} L 100 40 L 0 40 Z`}
              fill={`url(#spark-grad-${title.replace(/\s+/g, '-')})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d={sparklinePoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        )}
      </div>
    </Card>
  );
}

StatsCard.displayName = 'StatsCard';
