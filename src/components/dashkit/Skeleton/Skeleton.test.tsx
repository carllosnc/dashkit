import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { describe, it, expect } from 'vitest';

describe('Skeleton', () => {
  it('renders with default rectangular variant', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('ds-rounded');
  });

  it('applies circular variant correctly', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('applies text variant correctly', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('h-4', 'ds-rounded');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies shimmer animation class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('after:animate-[ds-shimmer_1.5s_infinite]');
  });
});
