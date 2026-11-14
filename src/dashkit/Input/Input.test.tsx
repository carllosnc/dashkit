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
    expect(screen.getByRole('textbox')).toHaveClass('pl-11');
  });

  it('renders right icon when passed', () => {
    render(<Input rightIcon={<FiLock data-testid="right-icon" />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pr-11');
  });

  it('shows error message and applies error styles', () => {
    render(<Input error="Invalid input" />);
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
    
    const wrapper = screen.getByTestId('input-wrapper');
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
    
    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper).toHaveClass('opacity-50');
  });

  it('generates a unique ID automatically and links it to the label when id is not provided', () => {
    render(
      <>
        <Input label="My Great Label" />
        <Input label="My Great Label" />
      </>
    );
    const labels = screen.getAllByText(/My Great Label/i);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].id).toBeTruthy();
    expect(inputs[1].id).toBeTruthy();
    expect(inputs[0].id).not.toBe(inputs[1].id);
    expect(labels[0]).toHaveAttribute('for', inputs[0].id);
    expect(labels[1]).toHaveAttribute('for', inputs[1].id);
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

  it('applies size modifiers correctly', () => {
    const { rerender } = render(<Input size="sm" leftIcon={<FiSearch />} />);
    expect(screen.getByRole('textbox')).toHaveClass('pl-8');

    rerender(<Input size="lg" leftIcon={<FiSearch />} />);
    expect(screen.getByRole('textbox')).toHaveClass('pl-12');

    rerender(<Input leftIcon={<FiSearch />} />);
    expect(screen.getByRole('textbox')).toHaveClass('pl-11');
  });
});
