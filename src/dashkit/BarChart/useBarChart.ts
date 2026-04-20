import * as React from 'react';
import type { BarChartSeries } from './BarChart';

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-primary-400)',
  'var(--color-primary-200)',
  'var(--color-primary-800)',
  'var(--color-primary-300)',
];

interface UseBarChartProps {
  data: Record<string, string | number>[];
  series: BarChartSeries[];
  barGap: number;
}

export function useBarChart({ data, series, barGap }: UseBarChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const validSeries = React.useMemo(() =>
    series.map((s, i) => ({
      ...s,
      color: s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
    })), [series]
  );

  const maxVal = React.useMemo(() =>
    Math.max(
      ...data.flatMap(d => validSeries.map(s => Number(d[s.key]) || 0)),
      0
    ) * 1.1, [data, validSeries]
  );

  const minVal = 0;
  const range = maxVal - minVal;
  const width = 1000;
  const svgHeight = 400;

  const groupWidth = width / data.length;
  const barsContainerWidth = groupWidth * 0.8;
  const groupPadding = (groupWidth - barsContainerWidth) / 2;
  const barWidth = (barsContainerWidth - (validSeries.length - 1) * barGap) / validSeries.length;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * width;

    const index = Math.floor(normalizedX / groupWidth);
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));

    setHoveredIndex(clampedIndex);

    const tooltipWidth = 140;
    const centerX = clampedIndex * groupWidth + groupWidth / 2;
    const tooltipX = (centerX / width) * rect.width;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(rect.width - tooltipWidth / 2 - 8, tooltipX));

    const groupMaxVal = Math.max(...validSeries.map(s => Number(data[clampedIndex][s.key]) || 0), 0);
    const highestY = svgHeight - ((groupMaxVal - minVal) / range) * svgHeight;

    setTooltipPos({
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  };

  const isNearTop = tooltipPos.y < 100;

  return {
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
  };
}
