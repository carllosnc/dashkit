import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';
import { describe, it, expect } from 'vitest';

describe('Divider', () => {
  it('renders a horizontal divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveClass('w-full');
  });

  it('renders a vertical divider', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders children (content) in horizontal mode', () => {
    render(<Divider>OR</Divider>);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Divider variant="dashed" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dashed');

    rerender(<Divider variant="dotted" />);
    expect(screen.getByRole('separator')).toHaveClass('border-dotted');
  });

  it('handles content position correctly (left hide right span)', () => {
    const { container } = render(<Divider contentPosition="left">Left Content</Divider>);
    const parts = container.querySelectorAll('.flex-1');
    // First div should be hidden when left
    expect(parts[0]).toHaveClass('hidden');
    expect(parts[1]).not.toHaveClass('hidden');
  });
});
