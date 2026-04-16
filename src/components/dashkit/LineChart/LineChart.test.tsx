import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';
import { describe, it, expect } from 'vitest';

describe('LineChart', () => {
  const data = [
    { label: 'Jan', value1: 100 },
    { label: 'Feb', value1: 80 }
  ];
  const series = [
    { key: 'value1', label: 'Series 1', color: 'red' }
  ];

  it('renders nothing when data or series is empty', () => {
    const { container } = render(<LineChart data={[]} series={series} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders SVG path for series', () => {
    const { container } = render(<LineChart data={data} series={series} />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('renders data points as HTML dots', () => {
    const { container } = render(<LineChart data={data} series={series} />);
    const dots = container.querySelectorAll('.absolute.rounded-full');
    expect(dots).toHaveLength(2);
  });

  it('renders labels when showLabels is true', () => {
    render(<LineChart data={data} series={series} showLabels={true} />);
    expect(screen.getByText(/Jan/i)).toBeInTheDocument();
    expect(screen.getByText(/Feb/i)).toBeInTheDocument();
  });
});
