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
    
    const wrapper = screen.getByRole('textbox').closest('.group');
    expect(wrapper).toHaveClass('border-ds-danger-500/50');
  });

  it('shows helper text when provided', () => {
    render(<Input helperText="This is context" />);
    expect(screen.getByText(/This is context/i)).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled defaultValue="test" />);
    const input = screen.getByDisplayValue(/test/i);
    expect(input).toBeDisabled();
    
    const wrapper = input.closest('.group');
    expect(wrapper).toHaveClass('opacity-50');
  });

  it('generates an ID automatically from label if not provided', () => {
    render(<Input label="My Great Label" />);
    const label = screen.getByText(/My Great Label/i);
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('input-my-great-label');
    expect(label).toHaveAttribute('for', 'input-my-great-label');
  });

  it('renders prefix correctly', () => {
    render(<Input prefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders suffix correctly', () => {
    render(<Input suffix=".00" />);
    expect(screen.getByText('.00')).toBeInTheDocument();
  });

  it('renders complex prefix and suffix', () => {
    render(<Input prefix={<span>Start</span>} suffix={<span>End</span>} />);
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });
});


