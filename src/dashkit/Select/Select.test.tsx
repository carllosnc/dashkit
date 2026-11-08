import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

describe('Select', () => {
  it('renders with label and placeholder', () => {
    render(<Select label="My Select" placeholder="Select something" options={options} />);
    expect(screen.getByText(/My Select/i)).toBeInTheDocument();
    expect(screen.getByText(/Select something/i)).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('button');
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onChange and closes when an option is selected', () => {
    const handleChange = vitest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(handleChange).toHaveBeenCalledWith('2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('displays the selected option label', () => {
    render(<Select options={options} value="1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Select an option')).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={options} disabled />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    
    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('applies size modifiers correctly', () => {
    const { container, rerender } = render(<Select options={options} size="sm" />);
    expect(container.firstChild).toHaveClass('select--sm');

    rerender(<Select options={options} size="lg" />);
    expect(container.firstChild).toHaveClass('select--lg');

    rerender(<Select options={options} />);
    expect(container.firstChild).toHaveClass('select--md');
  });

  it('renders error message and applies error styles', () => {
    render(<Select options={options} error="Please select a value" />);
    expect(screen.getByText('Please select a value')).toBeInTheDocument();
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveClass('select__trigger--error');
  });
});
