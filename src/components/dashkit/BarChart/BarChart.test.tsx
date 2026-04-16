import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';
import { describe, it, expect } from 'vitest';

describe('BarChart', () => {
  const data = [
    { label: 'Jan', value1: 100, value2: 50 },
    { label: 'Feb', value1: 80, value2: 120 }
  ];
  const series = [
    { key: 'value1', label: 'Series 1', color: 'red' },
    { key: 'value2', label: 'Series 2', color: 'blue' }
  ];

  it('renders nothing when data or series is empty', () => {
    const { container } = render(<BarChart data={[]} series={series} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders SVG groups and rectangles for data points', () => {
    const { container } = render(<BarChart data={data} series={series} />);
    const groups = container.querySelectorAll('g');
    expect(groups).toHaveLength(2);
    
    const rects = container.querySelectorAll('rect');
    expect(rects).toHaveLength(4); // 2 data points * 2 series
  });

  it('renders labels when showLabels is true', () => {
    render(<BarChart data={data} series={series} showLabels={true} />);
    expect(screen.getByText(/Jan/i)).toBeInTheDocument();
    expect(screen.getByText(/Feb/i)).toBeInTheDocument();
  });

  it('applies height correctly', () => {
    const { container } = render(<BarChart data={data} series={series} height={500} />);
    expect(container.firstChild).toHaveStyle('height: 500px');
  });
});
