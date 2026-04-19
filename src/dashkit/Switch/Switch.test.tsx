import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with label and description', () => {
    render(
      <Switch 
        label="Airplane Mode" 
        description="Toggle airplane mode settings" 
      />
    );
    
    expect(screen.getByText('Airplane Mode')).toBeInTheDocument();
    expect(screen.getByText('Toggle airplane mode settings')).toBeInTheDocument();
  });

  it('can be toggled', () => {
    render(<Switch label="Toggle" />);
    const input = screen.getByLabelText(/Toggle/i);
    
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch label="Disabled" disabled />);
    const input = screen.getByLabelText(/Disabled/i);
    expect(input).toBeDisabled();
  });

  it('generates an ID automatically from label if not provided', () => {
    render(<Switch label="My Switch" />);
    const label = screen.getByText(/My Switch/i);
    const input = screen.getByRole('checkbox');
    expect(input.id).toBe('switch-my-switch');
    expect(label.parentElement).toHaveAttribute('for', 'switch-my-switch');
  });
});


