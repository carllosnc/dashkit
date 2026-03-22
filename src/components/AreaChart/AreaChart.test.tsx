import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AreaChart } from './AreaChart';

const testData = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 20 },
  { label: 'Mar', value: 15 },
];

const testSeries = [
  { key: 'value', label: 'Test Series', color: 'blue' }
];

describe('AreaChart', () => {
  it('renders data labels correctly', () => {
    render(<AreaChart data={testData} series={testSeries} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('renders nothing when data is empty', () => {
    const { container } = render(<AreaChart data={[]} series={testSeries} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders svg path for each series', () => {
    const { container } = render(<AreaChart data={testData} series={testSeries} animate={false} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Line and area paths
    const paths = svg?.querySelectorAll('path');
    expect(paths?.length).toBeGreaterThanOrEqual(2);
  });
});


