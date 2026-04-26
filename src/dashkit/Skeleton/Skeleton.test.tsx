import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { describe, it, expect } from 'vitest';

describe('Skeleton', () => {
  it('renders with default rectangular variant', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('skeleton--rectangular');
  });

  it('applies circular variant correctly', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('skeleton--circular');
  });

  it('applies text variant correctly', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('skeleton--text');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies shimmer animation class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('skeleton--shimmer');
  });
});
