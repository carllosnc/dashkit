import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Card } from '../Card/Card';
import { AnimateNumber } from '../AnimateNumber/AnimateNumber';
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from 'react-icons/hi2';
import { Divider } from '../Divider/Divider';

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

const STATS_CARD_BASE = "relative overflow-hidden group";
const TITLE_STYLE = "text-xs font-medium text-muted-foreground tracking-tight uppercase";
const VALUE_STYLE = "text-3xl font-medium text-foreground tabular-nums tracking-tight";
const DESCRIPTION_STYLE = "text-xs text-muted-foreground mt-1";

const STATUS_MAP: Record<string, { text: string; bg: string; icon: React.ElementType }> = {
  success: {
    text: "text-ds-success-600 dark:text-ds-success-400",
    bg: "bg-ds-success-50 dark:bg-ds-success-400/10",
    icon: HiOutlineArrowTrendingUp,
  },
  danger: {
    text: "text-ds-danger-600 dark:text-ds-danger-400",
    bg: "bg-ds-danger-50 dark:bg-ds-danger-400/10",
    icon: HiOutlineArrowTrendingDown,
  },
  warning: {
    text: "text-ds-warning-600 dark:text-ds-warning-400",
    bg: "bg-ds-warning-50 dark:bg-ds-warning-400/10",
    icon: HiOutlineArrowTrendingUp,
  },
  info: {
    text: "text-ds-info-600 dark:text-ds-info-400",
    bg: "bg-ds-info-50 dark:bg-ds-info-400/10",
    icon: HiOutlineArrowTrendingUp,
  },
  neutral: {
    text: "text-muted-foreground",
    bg: "bg-muted/50",
    icon: HiOutlineArrowTrendingUp,
  }
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
  const statusStyles = STATUS_MAP[status];
  const TrendIcon = statusStyles.icon;

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
      className={cn(STATS_CARD_BASE, "pb-0", className)}
      animate={animate}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 overflow-hidden">
          <p className={TITLE_STYLE}>{title}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={cn(VALUE_STYLE, "whitespace-nowrap truncate leading-none pt-1")}>
              <AnimateNumber
                value={value}
                prefix={prefix}
                suffix={suffix}
                precision={precision}
              />
            </span>
            {typeof trend === 'number' && (
              <div className="flex items-center gap-1.5 pt-1">
                <span className={cn("flex items-center gap-1 text-[13px] font-bold", statusStyles.text)}>
                  <TrendIcon className="size-3.5" />
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
                {trendLabel && (
                  <span className="text-xs uppercase font-medium text-muted-foreground whitespace-nowrap hidden sm:block">
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
          <p className={DESCRIPTION_STYLE}>{description}</p>
        </div>
      )}

      <div className="mt-auto">
        {chart && (
          <div className="h-12 -mx-6">
            <svg
              viewBox="0 0 100 40"
              className={cn("w-full h-full overflow-visible", !chart.color && statusStyles.text)}
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
          </div>
        )}
      </div>
    </Card>
  );
}
