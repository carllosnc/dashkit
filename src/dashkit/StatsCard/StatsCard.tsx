import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Card } from '../Card/Card';
import { AnimateNumber } from '../AnimateNumber/AnimateNumber';
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from 'react-icons/hi2';
import { Divider } from '../Divider/Divider';

export interface StatsCardProps extends Omit<React.ComponentPropsWithoutRef<typeof Card>, 'title' | 'children'> {
  title: string;
  value: number;
  /** @default "" */
  prefix?: string;
  /** @default "" */
  suffix?: string;
  /** @default 0 */
  precision?: number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  /** @default 'neutral' */
  status?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  /** @default false */
  animate?: boolean;
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

const STATUS_COLORS: Record<string, string> = {
  success: 'text-ds-success-600 dark:text-ds-success-400',
  danger: 'text-ds-danger-600 dark:text-ds-danger-400',
  warning: 'text-ds-warning-600 dark:text-ds-warning-400',
  info: 'text-ds-info-600 dark:text-ds-info-400',
  neutral: 'text-muted-foreground',
};

/**
 * Prop-driven (`title`, `value`, `trend`, `status`, `chart`) KPI metric card.
 *
 * @example
 * ```tsx
 * <StatsCard title="MRR" value={64900} prefix="$" trend={12.4} status="success" />
 * ```
 */
export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(function StatsCard(
  {
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
    chart,
    ...props
  },
  ref
) {
  const sparkGradId = React.useId();
  const TrendIcon = STATUS_ICONS[status];
  const statusColor = STATUS_COLORS[status] || STATUS_COLORS.neutral;

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
      ref={ref}
      data-slot="stats-card"
      className={cn('relative overflow-hidden', !chart && 'pb-4', className)}
      animate={animate}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 overflow-hidden flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">{title}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-bold text-foreground tabular-nums tracking-tight whitespace-nowrap truncate leading-none">
              <AnimateNumber
                value={value}
                prefix={prefix}
                suffix={suffix}
                precision={precision}
              />
            </span>
          </div>
          {typeof trend === 'number' && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className={cn('flex items-center gap-1 text-[13px] font-bold', statusColor)}>
                <TrendIcon className="size-3.5" />
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && (
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
      </div>

      {description && (
        <div>
          <Divider variant="dashed" className="w-auto mb-[16px]" />
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      )}

      {chart && (
        <div className="h-12 -mx-6 mt-auto">
          <svg
            viewBox="0 0 100 40"
            className={cn('w-full h-full overflow-visible', !chart.color && statusColor)}
            style={chart.color ? { color: chart.color } : undefined}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={sparkGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <motion.path
              d={`${sparklinePoints} L 100 40 L 0 40 Z`}
              fill={`url(#${sparkGradId})`}
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
        </div>
      )}
    </Card>
  );
});

StatsCard.displayName = 'StatsCard';
