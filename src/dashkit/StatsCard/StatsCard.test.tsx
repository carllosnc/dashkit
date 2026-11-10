import { render, screen } from '@testing-library/react';
import { StatsCard } from './StatsCard';
import { describe, it, expect } from 'vitest';

describe('StatsCard', () => {
  it('renders title and formatted value', () => {
    const { container } = render(<StatsCard title="Total Revenue" value={54200} prefix="$" />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(container.textContent).toContain('$54,200');
  });

  it('renders trend badge and label', () => {
    render(
      <StatsCard
        title="Active Users"
        value={1200}
        trend={12.5}
        trendLabel="vs last month"
        status="success"
      />
    );
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders description and icon', () => {
    render(
      <StatsCard
        title="Conversion Rate"
        value={3.2}
        suffix="%"
        description="Average this quarter"
        icon={<span data-testid="stats-icon">Icon</span>}
      />
    );
    expect(screen.getByText('Average this quarter')).toBeInTheDocument();
    expect(screen.getByTestId('stats-icon')).toBeInTheDocument();
  });

  it('renders chart sparkline when data is provided', () => {
    const { container } = render(
      <StatsCard
        title="Visits"
        value={890}
        chart={{ data: [10, 20, 15, 30, 25, 40] }}
      />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
