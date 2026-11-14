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

  it('resolves gradient stopColor even without explicit color on series', () => {
    const { container } = render(
      <AreaChart
        data={testData}
        series={[{ key: 'value', label: 'Default Color Series' }]}
        animate={false}
      />
    );
    const stop = container.querySelector('linearGradient stop');
    expect(stop).toBeInTheDocument();
    expect(stop?.getAttribute('stop-color')).toBeTruthy();
  });

  it('applies custom strokeDasharray and strokeWidth', () => {
    const { container } = render(
      <AreaChart
        data={testData}
        series={[{ key: 'value', label: 'Dashed Target', strokeDasharray: '5 5', strokeWidth: 3 }]}
        animate={false}
      />
    );
    const linePath = container.querySelector('path[stroke-dasharray="5 5"]');
    expect(linePath).toBeInTheDocument();
    expect(linePath?.getAttribute('stroke-width')).toBe('3');
  });

  it('handles single data point and zero values without NaN coordinates', () => {
    const { container } = render(
      <AreaChart
        data={[{ label: 'Only', value: 0 }]}
        series={[{ key: 'value', label: 'Series' }]}
        animate={false}
      />
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
    paths.forEach((p) => {
      expect(p.getAttribute('d')).not.toContain('NaN');
    });
  });

  it('supports smooth curves, Y-axis, legend, and custom labelKey', () => {
    render(
      <AreaChart
        data={[{ month: 'Apr', value: 100 }, { month: 'May', value: 200 }, { month: 'Jun', value: 150 }]}
        series={[{ key: 'value', label: 'Revenue' }]}
        curve="smooth"
        showYAxis
        showLegend
        showDots="hover"
        labelKey="month"
        valueFormatter={(v) => `$${v}`}
        animate={false}
      />
    );
    expect(screen.getByText('Apr')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});
