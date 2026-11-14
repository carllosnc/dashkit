import * as React from 'react';

export interface AreaChartSeries {
  key: string;
  label: string;
  color?: string;
  strokeDasharray?: string;
  strokeWidth?: number;
  fillOpacity?: number;
}

export interface UseAreaChartProps {
  data: Record<string, string | number>[];
  series: AreaChartSeries[];
  width?: number;
  svgHeight?: number;
  defaultColors?: string[];
}

export function buildAreaLinePath(
  points: { x: number; y: number }[],
  curve: 'linear' | 'smooth' = 'linear',
  svgHeight = 400
): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (curve === 'linear' || points.length === 2) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  const clampY = (y: number) => Math.max(0, Math.min(svgHeight, y));
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = clampY(p1.y + (p2.y - p0.y) / 6);
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = clampY(p2.y - (p3.y - p1.y) / 6);

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
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
    const rawMax = Math.max(
      ...data.flatMap((d) => series.map((s) => Number(d[s.key]) || 0)),
      0
    );
    return rawMax === 0 ? 1 : rawMax * 1.1;
  }, [data, series]);

  const minVal = 0;
  const range = maxVal - minVal || 1;

  const getSeriesPoints = React.useCallback((seriesKey: string) => {
    return data.map((d, i) => {
      const value = Number(d[seriesKey]) || 0;
      const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * width;
      const y = svgHeight - ((value - minVal) / range) * svgHeight;
      return { x, y, value };
    });
  }, [data, width, svgHeight, range, minVal]);

  const allSeriesPoints = React.useMemo(() => {
    return series.map((s, i) => ({
      ...s,
      color: s.color || defaultColors[i % defaultColors.length] || 'var(--color-primary)',
      fillOpacity: s.fillOpacity ?? 0.2,
      strokeWidth: s.strokeWidth ?? 2,
      strokeDasharray: s.strokeDasharray,
      points: getSeriesPoints(s.key)
    }));
  }, [series, defaultColors, getSeriesPoints]);

  const updateHoverFromClientX = React.useCallback((clientX: number) => {
    const svg = chartRef.current;
    if (!svg || data.length === 0) return;

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return;

    const x = clientX - rect.left;
    const clampedIndex =
      data.length === 1
        ? 0
        : Math.max(
            0,
            Math.min(
              data.length - 1,
              Math.round((x / rect.width) * (data.length - 1))
            )
          );

    setHoveredIndex(clampedIndex);

    const highestY = Math.min(
      ...allSeriesPoints.map((s) => s.points[clampedIndex]?.y ?? svgHeight)
    );
    const tooltipWidth = 140;
    const rawX =
      data.length === 1
        ? rect.width / 2
        : (clampedIndex / (data.length - 1)) * rect.width;
    const clampedX = Math.max(
      tooltipWidth / 2 + 8,
      Math.min(rect.width - tooltipWidth / 2 - 8, rawX)
    );

    setTooltipPos({
      x: clampedX,
      y: (highestY / svgHeight) * rect.height
    });
  }, [allSeriesPoints, data.length, svgHeight]);

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
    allSeriesPoints,
    handleMouseMove,
    handleTouchMove,
    setHoveredIndex,
    isNearTop,
    maxVal,
    width,
    svgHeight
  };
}
