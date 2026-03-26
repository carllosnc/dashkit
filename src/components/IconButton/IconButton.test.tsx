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
    expect(button).not.toHaveClass('rounded-full');

    rerender(<IconButton icon={<FiPlus />} rounded={true} />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<IconButton icon={<FiPlus />} variant="filled" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');

    rerender(<IconButton icon={<FiPlus />} variant="soft" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');

    rerender(<IconButton icon={<FiPlus />} variant="outlined" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-linear-to-b');
  });

  it('is disabled when disabled prop is true', () => {
    render(<IconButton icon={<FiPlus />} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
