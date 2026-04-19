import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateField } from './DateField';
import '@testing-library/jest-dom';

describe('DateField', () => {
  it('renders with label', () => {
    render(<DateField label="Date of Birth" />);
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<DateField label="Date" description="Choose a date" />);
    expect(screen.getByText('Choose a date')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<DateField label="Date" error="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('displays provided value', () => {
    const date = new Date(2024, 0, 15); // Jan 15, 2024
    render(<DateField label="Date" value={date} />);
    
    // Month segment
    const monthInput = screen.getByPlaceholderText('MM') as HTMLInputElement;
    expect(monthInput.value).toBe('01');
    
    // Day segment
    const dayInput = screen.getByPlaceholderText('DD') as HTMLInputElement;
    expect(dayInput.value).toBe('15');
    
    // Year segment
    const yearInput = screen.getByPlaceholderText('YYYY') as HTMLInputElement;
    expect(yearInput.value).toBe('2024');
  });

  it('calls onChange when value updates', () => {
    const onChange = vi.fn();
    render(<DateField label="Date" onChange={onChange} />);
    
    const monthInput = screen.getByPlaceholderText('MM');
    const dayInput = screen.getByPlaceholderText('DD');
    const yearInput = screen.getByPlaceholderText('YYYY');

    fireEvent.change(monthInput, { target: { value: '12' } });
    fireEvent.change(dayInput, { target: { value: '25' } });
    fireEvent.change(yearInput, { target: { value: '2023' } });

    expect(onChange).toHaveBeenCalled();
    const calls = onChange.mock.calls;
    const finalDate = calls.find(call => call[0] instanceof Date)?.[0];
    
    expect(finalDate).not.toBeNull();
    if (finalDate) {
      expect(finalDate.getFullYear()).toBe(2023);
      expect(finalDate.getMonth()).toBe(11); // 0-indexed December
      expect(finalDate.getDate()).toBe(25);
    }
  });

  it('shows required asterisk when isRequired is true', () => {
    render(<DateField label="Date" isRequired />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables all inputs when disabled is true', () => {
    render(<DateField label="Date" disabled />);
    expect(screen.getByPlaceholderText('MM')).toBeDisabled();
    expect(screen.getByPlaceholderText('DD')).toBeDisabled();
    expect(screen.getByPlaceholderText('YYYY')).toBeDisabled();
  });
});
