import * as React from 'react';
import { type PieChartDataItem } from './PieChart';

export interface UsePieChartProps {
  data: PieChartDataItem[];
  innerRadius: number;
  showTooltip: boolean;
}

export function usePieChart({ data, innerRadius, showTooltip }: UsePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) {
    return {
      hoveredIndex,
      setHoveredIndex,
      tooltipPos,
      containerRef,
      slices: [],
      handleMouseMove: () => {},
      handleTouchMove: () => {},
      handleLegendEnter: () => {},
      isNearTop: false,
      total: 0,
      size: 400,
      center: 200
    };
  }

  const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0);
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const safeInnerRadius = innerRadius > 1
    ? Math.min(innerRadius / 100, 0.95)
    : Math.max(0, Math.min(innerRadius, 0.95));
  const holeRadius = radius * safeInnerRadius;

  const slices = data.reduce((acc, item) => {
    const { slices: currentSlices, currentAngle } = acc;
    const safeValue = Math.max(0, item.value);
    const angle = total > 0 ? (safeValue / total) * Math.PI * 2 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    let path = '';
    if (angle >= Math.PI * 2 - 0.0001) {
      // Full-circle fallback: split into two 180° arcs so SVG doesn't collapse start==end
      const outer = [
        `M ${center} ${center - radius}`,
        `A ${radius} ${radius} 0 1 1 ${center} ${center + radius}`,
        `A ${radius} ${radius} 0 1 1 ${center} ${center - radius}`
      ];
      if (holeRadius > 0) {
        path = [
          ...outer,
          `M ${center} ${center - holeRadius}`,
          `A ${holeRadius} ${holeRadius} 0 1 0 ${center} ${center + holeRadius}`,
          `A ${holeRadius} ${holeRadius} 0 1 0 ${center} ${center - holeRadius}`,
          'Z'
        ].join(' ');
      } else {
        path = [...outer, 'Z'].join(' ');
      }
    } else if (angle > 0) {
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const x3 = center + holeRadius * Math.cos(endAngle);
      const y3 = center + holeRadius * Math.sin(endAngle);
      const x4 = center + holeRadius * Math.cos(startAngle);
      const y4 = center + holeRadius * Math.sin(startAngle);

      const largeArc = angle > Math.PI ? 1 : 0;

      path = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${holeRadius} ${holeRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
    }

    return {
      slices: [...currentSlices, { ...item, path, startAngle, endAngle }],
      currentAngle: endAngle
    };
  }, {
    slices: [] as (PieChartDataItem & { path: string; startAngle: number; endAngle: number })[],
    currentAngle: -Math.PI / 2
  }).slices;

  const updateTooltipFromCoords = (clientX: number, clientY: number, index: number) => {
    if (!showTooltip || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
    setHoveredIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    updateTooltipFromCoords(e.clientX, e.clientY, index);
  };

  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    if (e.touches.length > 0) {
      updateTooltipFromCoords(e.touches[0].clientX, e.touches[0].clientY, index);
    }
  };

  const handleLegendEnter = (index: number) => {
    setHoveredIndex(index);
    const slice = slices[index];
    if (!showTooltip || !slice || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const midAngle = (slice.startAngle + slice.endAngle) / 2;
    const midRadius = (radius + holeRadius) / 2;
    const svgX = center + midRadius * Math.cos(midAngle);
    const svgY = center + midRadius * Math.sin(midAngle);

    setTooltipPos({
      x: (svgX / size) * rect.width,
      y: (svgY / size) * rect.height
    });
  };

  const isNearTop = tooltipPos.y < 72;

  return {
    hoveredIndex,
    setHoveredIndex,
    tooltipPos,
    containerRef,
    slices,
    handleMouseMove,
    handleTouchMove,
    handleLegendEnter,
    isNearTop,
    total,
    size,
    center
  };
}
