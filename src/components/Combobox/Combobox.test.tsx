import { render, screen, fireEvent } from '@testing-library/react';
import { Combobox } from './Combobox';
import { describe, it, expect, vi } from 'vitest';

describe('Combobox', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ];

  it('renders with label and placeholder', () => {
    render(<Combobox label="Fruit" placeholder="Select a fruit" options={options} />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select a fruit')).toBeInTheDocument();
  });

  it('opens dropdown and filters options on input', () => {
    render(<Combobox options={options} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'ap' } });
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();
    render(<Combobox options={options} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Banana'));
    
    expect(handleChange).toHaveBeenCalledWith('banana');
  });

  it('handles multiple selection mode', () => {
    const handleChange = vi.fn();
    render(<Combobox options={options} multiple value={['apple']} onChange={handleChange} />);
    
    // Check if Chip is rendered for existing value
    expect(screen.getByText('Apple')).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Banana'));
    
    expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  it('clears selection when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(<Combobox options={options} value="apple" onChange={handleChange} />);
    
    const clearButton = screen.getByLabelText(/clear selection/i);
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('closes dropdown when Escape key is pressed', () => {
    render(<Combobox options={options} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
