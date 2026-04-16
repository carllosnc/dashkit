import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
import { describe, it, expect } from 'vitest';

describe('Spinner', () => {
  it('renders with default size and strokeWidth', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24px');
    expect(svg).toHaveAttribute('height', '24px');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('applies custom size and thickness', () => {
    const { container } = render(<Spinner size={48} thickness={4} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48px');
    expect(svg).toHaveAttribute('height', '48px');
    expect(svg).toHaveAttribute('stroke-width', '4');
  });

  it('applies custom color', () => {
    const { container } = render(<Spinner color="red" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'red');
  });

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('animate-spin');
  });
});
