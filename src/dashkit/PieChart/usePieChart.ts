import * as React from 'react';
import { type PieChartDataItem } from './PieChart';

export interface UsePieChartProps {
  data: PieChartDataItem[];
  innerRadius: number;
  showTooltip: boolean;
}

export function usePieChart({ data, innerRadius, showTooltip }: UsePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) {
    return {
      hoveredIndex,
      setHoveredIndex,
      tooltipPos,
      containerRef,
      slices: [],
      handleMouseMove: () => {},
      isNearTop: false,
      total: 0,
      size: 400,
      center: 200
    };
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const holeRadius = radius * innerRadius;

  const slices = data.reduce((acc, item) => {
    const { slices: currentSlices, currentAngle } = acc;
    const angle = (item.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const x3 = center + holeRadius * Math.cos(endAngle);
    const y3 = center + holeRadius * Math.sin(endAngle);
    const x4 = center + holeRadius * Math.cos(startAngle);
    const y4 = center + holeRadius * Math.sin(startAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${holeRadius} ${holeRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    return {
      slices: [...currentSlices, { ...item, path, startAngle, endAngle }],
      currentAngle: endAngle
    };
  }, {
    slices: [] as (PieChartDataItem & { path: string, startAngle: number, endAngle: number })[],
    currentAngle: -Math.PI / 2
  }).slices;

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!showTooltip || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredIndex(index);
  };

  const isNearTop = tooltipPos.y < 100;

  return {
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
  };
}
