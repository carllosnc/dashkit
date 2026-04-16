import * as React from 'react';
import { type LineChartSeries } from './LineChart';

export interface UseLineChartProps {
  data: Record<string, string | number>[];
  series: LineChartSeries[];
}

export function useLineChart({ data, series }: UseLineChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const width = 1000;
  const svgHeight = 400;

  if (!data || data.length === 0 || !series || series.length === 0) {
    return {
      chartRef,
      hoveredIndex,
      setHoveredIndex,
      tooltipPos,
      allSeriesPoints: [],
      handleMouseMove: () => {},
      isNearTop: false,
      width,
      svgHeight
    };
  }

  const maxVal = Math.max(
    ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
    0
  ) * 1.1;

  const minVal = 0;
  const range = maxVal - minVal;

  const getSeriesPoints = (seriesKey: string) => {
    return data.map((d, i) => {
      const value = Number(d[seriesKey]) || 0;
      const x = (i / (data.length - 1)) * width;
      const y = svgHeight - ((value - minVal) / range) * svgHeight;
      return { x, y, value };
    });
  };

  const allSeriesPoints = series.map(s => ({
    ...s,
    points: getSeriesPoints(s.key)
  }));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = chartRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * width;

    const index = Math.round((normalizedX / width) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));

    setHoveredIndex(clampedIndex);

    const highestY = Math.min(...allSeriesPoints.map(s => s.points[clampedIndex].y));

    const tooltipWidth = 140;
    const rawX = (clampedIndex / (data.length - 1)) * rect.width;
    const clampedX = Math.max(tooltipWidth / 2 + 8, Math.min(rect.width - tooltipWidth / 2 - 8, rawX));

    setTooltipPos({
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  };

  const isNearTop = tooltipPos.y < 100;

  return {
    chartRef,
    hoveredIndex,
    setHoveredIndex,
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    isNearTop,
    width,
    svgHeight
  };
}
