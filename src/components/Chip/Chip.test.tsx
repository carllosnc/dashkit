import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from './Chip';
import { describe, it, expect, vi } from 'vitest';
import { FiClock } from 'react-icons/fi';

describe('Chip', () => {
  it('renders the chip with label', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders an icon when passed', () => {
    render(<Chip label="Time" icon={<FiClock data-testid="chip-icon" />} />);
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
  });

  it('renders a checkmark when selected is true', () => {
    const { container } = render(<Chip label="Filter" selected />);
    // FiCheck should be rendered
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick when the chip is clicked', () => {
    const handleClick = vi.fn();
    render(<Chip label="Interactive" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Interactive'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when the delete icon is clicked', () => {
    const handleDelete = vi.fn();
    render(<Chip label="Deletable" onDelete={handleDelete} />);
    const deleteButton = screen.getByLabelText('Remove');
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('is disabled and not interactive when disabled prop is true', () => {
    const handleClick = vi.fn();
    const handleDelete = vi.fn();
    render(
      <Chip 
        label="Disabled" 
        disabled 
        onClick={handleClick} 
        onDelete={handleDelete} 
      />
    );
    
    const chip = screen.getByText('Disabled').closest('div');
    expect(chip).toHaveClass('opacity-50');
    expect(chip).toHaveClass('pointer-events-none');
    
    // Clicking shouldn't fire because pointer-events-none, 
    // but we can also check the logic
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
