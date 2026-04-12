import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { describe, it, expect, vi } from 'vitest';

describe('DatePicker', () => {
  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DatePicker label="Birth date" />);
    expect(screen.getByText('Birth date')).toBeInTheDocument();
  });

  it('opens calendar on click', async () => {
    render(<DatePicker placeholder="Select date" />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    // Check if calendar header appeared
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = months[new Date().getMonth()];
    expect(await screen.findByText(new RegExp(currentMonth, 'i'))).toBeInTheDocument();
  });

  it('calls onChange and closes when a date is selected', async () => {
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    // Select day 15 (assuming it's in the current month)
    const day15 = await screen.findByText('15');
    fireEvent.click(day15);
    
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(Date);
    expect(onChange.mock.calls[0][0].getDate()).toBe(15);
    
    // Calendar should be closed
    await waitForElementToBeRemoved(() => screen.queryByText('Jump to today'));
  });

  it('closes when window scrolls', async () => {
    render(<DatePicker placeholder="Select date" />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    expect(await screen.findByText('Jump to today')).toBeInTheDocument();
    
    fireEvent.scroll(window);
    
    await waitForElementToBeRemoved(() => screen.queryByText('Jump to today'));
  });

  it('closes when clicking outside', async () => {
    render(
      <div>
        <DatePicker placeholder="Select date" />
        <div data-testid="outside">Outside</div>
      </div>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    expect(await screen.findByText('Jump to today')).toBeInTheDocument();
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    await waitForElementToBeRemoved(() => screen.queryByText('Jump to today'));
  });
});
