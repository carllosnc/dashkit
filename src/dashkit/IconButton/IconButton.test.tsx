import { render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';
import { FiPlus } from 'react-icons/fi';
import { describe, it, expect } from 'vitest';

describe('IconButton', () => {
  it('renders the icon button with an icon', () => {
    render(<IconButton icon={<FiPlus data-testid="plus-icon" />} />);
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('renders as a button by default', () => {
    render(<IconButton icon={<FiPlus />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<IconButton icon={<FiPlus />} href="https://example.com" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('applies rounded classes when rounded prop is true', () => {
    const { rerender } = render(<IconButton icon={<FiPlus />} rounded={false} />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-md');

    rerender(<IconButton icon={<FiPlus />} rounded={true} />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<IconButton icon={<FiPlus />} variant="filled" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('ds-primary-gradient');

    rerender(<IconButton icon={<FiPlus />} variant="soft" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');

    rerender(<IconButton icon={<FiPlus />} variant="outlined" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border-border');
  });

  it('applies size modifiers correctly', () => {
    const { rerender } = render(<IconButton icon={<FiPlus />} size="sm" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('size-7');

    rerender(<IconButton icon={<FiPlus />} size="lg" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('size-11');

    rerender(<IconButton icon={<FiPlus />} />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('size-9');
  });

  it('is disabled when disabled prop is true', () => {
    render(<IconButton icon={<FiPlus />} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('keeps a visible focus ring for keyboard users', () => {
    render(<IconButton icon={<FiPlus />} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-ring');
  });
});
