import * as React from 'react';

export interface AreaChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface UseAreaChartProps {
  data: Record<string, string | number>[];
  series: AreaChartSeries[];
  width?: number;
  svgHeight?: number;
  defaultColors?: string[];
}

export function useAreaChart({
  data,
  series,
  width = 1000,
  svgHeight = 400,
  defaultColors = []
}: UseAreaChartProps) {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const maxVal = React.useMemo(() => {
    return Math.max(
      ...data.flatMap(d => series.map(s => Number(d[s.key]) || 0)),
      0
    ) * 1.1;
  }, [data, series]);

  const minVal = 0;
  const range = maxVal - minVal;

  const getSeriesPoints = React.useCallback((seriesKey: string) => {
    return data.map((d, i) => {
      const value = Number(d[seriesKey]) || 0;
      const x = (i / (data.length - 1)) * width;
      const y = svgHeight - ((value - minVal) / range) * svgHeight;
      return { x, y, value };
    });
  }, [data, width, svgHeight, range, minVal]);

  const allSeriesPoints = React.useMemo(() => {
    return series.map((s, i) => ({
      ...s,
      color: s.color || defaultColors[i % defaultColors.length] || 'var(--color-primary)',
      points: getSeriesPoints(s.key)
    }));
  }, [series, defaultColors, getSeriesPoints]);

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
    tooltipPos,
    allSeriesPoints,
    handleMouseMove,
    setHoveredIndex,
    isNearTop,
    width,
    svgHeight
  };
}
