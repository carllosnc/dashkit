import * as React from 'react';
import type { BarChartSeries } from './BarChart';

const DEFAULT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

interface UseBarChartProps {
  data: Record<string, string | number>[];
  series: BarChartSeries[];
  barGap: number;
  maxBarWidth: number;
  stacked?: boolean;
}

export function useBarChart({
  data,
  series,
  barGap,
  maxBarWidth,
  stacked = false
}: UseBarChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const validSeries = React.useMemo(() =>
    series.map((s, i) => ({
      ...s,
      color: s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
    })), [series]
  );

  const maxVal = React.useMemo(() => {
    if (!data || data.length === 0 || validSeries.length === 0) return 1;
    const rawMax = stacked
      ? Math.max(
          ...data.map((d) =>
            validSeries.reduce((sum, s) => sum + (Number(d[s.key]) || 0), 0)
          ),
          0
        )
      : Math.max(
          ...data.flatMap((d) => validSeries.map((s) => Number(d[s.key]) || 0)),
          0
        );
    return rawMax === 0 ? 1 : rawMax * 1.1;
  }, [data, validSeries, stacked]);

  const minVal = 0;
  const range = maxVal - minVal || 1;
  const width = 1000;
  const svgHeight = 400;

  const groupWidth = data.length > 0 ? width / data.length : 0;
  const maxBarsContainerWidth = groupWidth * 0.8;
  const rawBarWidth = stacked
    ? maxBarsContainerWidth
    : validSeries.length > 0
      ? (maxBarsContainerWidth - (validSeries.length - 1) * barGap) / validSeries.length
      : 0;
  const barWidth = Math.max(0, Math.min(rawBarWidth, maxBarWidth));
  const barsContainerWidth = stacked
    ? barWidth
    : validSeries.length > 0
      ? validSeries.length * barWidth + (validSeries.length - 1) * barGap
      : 0;
  const groupPadding = (groupWidth - barsContainerWidth) / 2;

  const updateHoverFromClientX = React.useCallback((clientX: number) => {
    const svg = chartRef.current;
    if (!svg || data.length === 0 || groupWidth === 0) return;

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return;

    const x = clientX - rect.left;
    const normalizedX = (x / rect.width) * width;

    const index = Math.floor(normalizedX / groupWidth);
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));

    setHoveredIndex(clampedIndex);

    const tooltipWidth = 140;
    const centerX = clampedIndex * groupWidth + groupWidth / 2;
    const tooltipX = (centerX / width) * rect.width;
    const clampedX = Math.max(
      tooltipWidth / 2 + 8,
      Math.min(rect.width - tooltipWidth / 2 - 8, tooltipX)
    );

    const groupMaxVal = stacked
      ? validSeries.reduce((sum, s) => sum + (Number(data[clampedIndex][s.key]) || 0), 0)
      : Math.max(...validSeries.map((s) => Number(data[clampedIndex][s.key]) || 0), 0);
    const highestY = svgHeight - ((groupMaxVal - minVal) / range) * svgHeight;

    setTooltipPos({
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  }, [data, groupWidth, minVal, range, stacked, svgHeight, validSeries]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    updateHoverFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      updateHoverFromClientX(e.touches[0].clientX);
    }
  };

  const isNearTop = tooltipPos.y < 100;

  return {
    chartRef,
    hoveredIndex,
    tooltipPos,
    setHoveredIndex,
    validSeries,
    minVal,
    maxVal,
    range,
    width,
    svgHeight,
    groupWidth,
    groupPadding,
    barWidth,
    handleMouseMove,
    handleTouchMove,
    isNearTop
  };
}
