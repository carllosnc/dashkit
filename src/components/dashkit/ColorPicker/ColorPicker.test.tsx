import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ColorPicker } from './ColorPicker';
import type { ReactNode, CSSProperties } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, style }: { children: ReactNode, onClick?: () => void, className?: string, style?: CSSProperties }) => (
      <div onClick={onClick} className={className} style={style}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('ColorPicker', () => {
  it('renders label and current hex value', () => {
    render(<ColorPicker label="Pick a color" defaultValue="#EF4444" />);
    expect(screen.getByText('Pick a color')).toBeInTheDocument();
    expect(screen.getByText('#EF4444')).toBeInTheDocument();
  });

  it('opens popover when clicking the color button', () => {
    render(<ColorPicker defaultValue="#3B82F6" />);
    const trigger = screen.getByRole('button');
    
    // Content is not there yet
    expect(screen.queryByPlaceholderText('#000000')).not.toBeInTheDocument();
    
    fireEvent.click(trigger);
    
    // Content should be visible (Input with placeholder)
    expect(screen.getByPlaceholderText('#000000')).toBeInTheDocument();
  });

  it('updates color when a preset info is clicked', () => {
    const onChange = vi.fn();
    render(<ColorPicker defaultValue="#FFFFFF" onChange={onChange} />);
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    // Click on Red (#EF4444) preset - it's in the DEFAULT_PRESETS
    // Presets are buttons with background color style
    const redPreset = screen.getAllByRole('button').find(btn => 
      btn.getAttribute('style')?.includes('background-color: rgb(239, 68, 68)') // #EF4444
    );

    if (redPreset) {
      fireEvent.click(redPreset);
      expect(onChange).toHaveBeenCalledWith('#EF4444');
      expect(screen.getByText('#EF4444')).toBeInTheDocument();
    } else {
      throw new Error('Red preset not found');
    }
  });

  it('updates color when hex value is typed in the input', () => {
    const onChange = vi.fn();
    render(<ColorPicker defaultValue="#000000" onChange={onChange} />);
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const input = screen.getByPlaceholderText('#000000');
    fireEvent.change(input, { target: { value: '#FFFFFF' } });

    expect(onChange).toHaveBeenCalledWith('#FFFFFF');
    expect(screen.getByText('#FFFFFF')).toBeInTheDocument();
  });

  it('shows error message if provided', () => {
    render(<ColorPicker error="Color is invalid" />);
    expect(screen.getByText('Color is invalid')).toBeInTheDocument();
  });

  it('shows helper text if provided', () => {
    render(<ColorPicker helperText="Select your brand color" />);
    expect(screen.getByText('Select your brand color')).toBeInTheDocument();
  });
});
