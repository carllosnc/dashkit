import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with label and description', () => {
    render(
      <Radio 
        label="Premium Plan" 
        description="The best choice for professionals" 
      />
    );
    
    expect(screen.getByText(/Premium Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/The best choice for professionals/i)).toBeInTheDocument();
  });

  it('can be selected', () => {
    render(
      <div>
        <Radio label="Option 1" name="test" value="1" />
        <Radio label="Option 2" name="test" value="2" />
      </div>
    );
    const radio1 = screen.getByLabelText(/Option 1/i);
    const radio2 = screen.getByLabelText(/Option 2/i);
    
    expect(radio1).not.toBeChecked();
    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    
    fireEvent.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked(); // standard radio behavior
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio label="Disabled Radio" disabled />);
    const radio = screen.getByLabelText(/Disabled Radio/i);
    expect(radio).toBeDisabled();
    
    const container = radio.closest('.group');
    const visualBox = container?.querySelector('.rounded-full');
    expect(visualBox).toHaveClass('peer-disabled:opacity-50');
  });

  it('generates an ID automatically from label if not provided', () => {
    render(<Radio label="My Radio" />);
    const label = screen.getByText(/My Radio/i);
    const input = screen.getByRole('radio');
    expect(input.id).toBe('radio-my-radio');
    expect(label.parentElement).toHaveAttribute('for', 'radio-my-radio');
  });
});


