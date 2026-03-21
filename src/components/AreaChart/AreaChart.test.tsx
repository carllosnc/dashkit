import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AreaChart } from './AreaChart';

const testData = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 20 },
  { label: 'Mar', value: 15 },
];

describe('AreaChart', () => {
  it('renders data labels correctly', () => {
    render(<AreaChart data={testData} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
    expect(screen.getByText('Mar')).toBeInTheDocument();
  });

  it('renders nothing when data is empty', () => {
    const { container } = render(<AreaChart data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders svg path with data points', () => {
    const { container } = render(<AreaChart data={testData} animate={false} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
