import { render, screen } from '@testing-library/react';
import { PieChart } from './PieChart';
import { describe, it, expect } from 'vitest';

describe('PieChart', () => {
  const data = [
    { label: 'Category A', value: 400, color: 'red' },
    { label: 'Category B', value: 300, color: 'blue' },
    { label: 'Category C', value: 300, color: 'green' }
  ];

  it('renders nothing when data is empty', () => {
    const { container } = render(<PieChart data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders SVG paths for slices', () => {
    const { container } = render(<PieChart data={data} />);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(3);
  });

  it('applies color to slices', () => {
    const { container } = render(<PieChart data={data} />);
    const paths = container.querySelectorAll('path');
    expect(paths[0]).toHaveAttribute('fill', 'red');
    expect(paths[1]).toHaveAttribute('fill', 'blue');
    expect(paths[2]).toHaveAttribute('fill', 'green');
  });

  it('renders legend when showLabels is true', () => {
    render(<PieChart data={data} showLabels={true} />);
    expect(screen.getByText(/Category A/i)).toBeInTheDocument();
    expect(screen.getByText(/Category B/i)).toBeInTheDocument();
    expect(screen.getByText(/Category C/i)).toBeInTheDocument();
  });
});
