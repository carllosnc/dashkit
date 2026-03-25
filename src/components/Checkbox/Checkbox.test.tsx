import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label and description', () => {
    render(
      <Checkbox 
        label="Accept Terms" 
        description="I agree to the terms of service" 
      />
    );
    
    expect(screen.getByText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to the terms of service/i)).toBeInTheDocument();
  });

  it('can be checked and unchecked', () => {
    render(<Checkbox label="Click me" />);
    const checkbox = screen.getByLabelText(/Click me/i);
    
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox label="Pre-checked" defaultChecked />);
    expect(screen.getByLabelText(/Pre-checked/i)).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Can't touch this" disabled />);
    const checkbox = screen.getByLabelText(/Can't touch this/i);
    expect(checkbox).toBeDisabled();
    
    // Check if the visual div also reflects disabled state (via opacity)
    const visualBox = checkbox.nextElementSibling;
    expect(visualBox).toHaveClass('peer-disabled:opacity-60');
  });

  it('generates an ID automatically from label if not provided', () => {
    render(<Checkbox label="My Awesome Checkbox" />);
    const label = screen.getByText(/My Awesome Checkbox/i);
    const input = screen.getByRole('checkbox');
    expect(input.id).toBe('checkbox-my-awesome-checkbox');
    expect(label.parentElement).toHaveAttribute('for', 'checkbox-my-awesome-checkbox');
  });

  it('triggers onChange when clicked', () => {
    const handleChange = vitest.fn();
    render(<Checkbox label="Observe me" onChange={handleChange} />);
    const checkbox = screen.getByLabelText(/Observe me/i);
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});


