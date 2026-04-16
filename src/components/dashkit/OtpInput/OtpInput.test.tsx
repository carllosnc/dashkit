import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OtpInput } from './OtpInput';

describe('OtpInput', () => {
  it('renders correct number of inputs', () => {
    render(<OtpInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('shifts focus on input', () => {
    render(<OtpInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('shifts focus back on backspace', () => {
    const TestWrapper = () => {
      const [val, setVal] = useState('12');
      return <OtpInput length={4} value={val} onChange={setVal} />;
    };
    render(<TestWrapper />);
    const inputs = screen.getAllByRole('textbox');
    
    inputs[1].focus();
    fireEvent.change(inputs[1], { target: { value: '' } });
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('handles pasting a code', () => {
    const handleChange = vitest.fn();
    render(<OtpInput length={4} onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox');
    
    const pasteEvent = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: { getData: () => '1234' }
    });
    
    fireEvent(inputs[0], pasteEvent);
    expect(handleChange).toHaveBeenCalledWith('1234');
  });
});


