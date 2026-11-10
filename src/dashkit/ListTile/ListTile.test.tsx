import { render, screen, fireEvent } from '@testing-library/react';
import { ListTile } from './ListTile';
import { describe, it, expect, vi } from 'vitest';

describe('ListTile', () => {
  it('renders title and subtitle', () => {
    render(<ListTile title="Settings" subtitle="Manage preferences" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage preferences')).toBeInTheDocument();
  });

  it('renders leading and trailing elements', () => {
    render(
      <ListTile
        title="Notifications"
        leading={<span data-testid="leading-icon">Icon</span>}
        trailing={<span data-testid="trailing-badge">3</span>}
      />
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trailing-badge')).toBeInTheDocument();
  });

  it('handles click when interactive', () => {
    const handleClick = vi.fn();
    render(<ListTile title="Clickable Tile" onClick={handleClick} />);
    const tile = screen.getByRole('button');
    fireEvent.click(tile);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<ListTile title="Disabled Tile" disabled onClick={handleClick} />);
    const tile = screen.getByText('Disabled Tile');
    fireEvent.click(tile);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
