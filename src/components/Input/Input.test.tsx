import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { FiSearch, FiLock } from 'react-icons/fi';

describe('Input', () => {
  it('renders correctly with base properties', () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
  });

  it('renders left icon when passed', () => {
    render(<Input leftIcon={<FiSearch data-testid="left-icon" />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when passed', () => {
    render(<Input rightIcon={<FiLock data-testid="right-icon" />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('shows error message and applies error styles', () => {
    render(<Input error="Invalid input" />);
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-ds-danger-500/50');
  });

  it('shows helper text when provided', () => {
    render(<Input helperText="This is context" />);
    expect(screen.getByText(/This is context/i)).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled defaultValue="test" />);
    const input = screen.getByDisplayValue(/test/i);
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
  });

  it('generates an ID automatically from label if not provided', () => {
    render(<Input label="My Great Label" />);
    const label = screen.getByText(/My Great Label/i);
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('input-my-great-label');
    expect(label).toHaveAttribute('for', 'input-my-great-label');
  });
});


