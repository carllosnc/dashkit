import { render, screen, fireEvent, act } from '@testing-library/react';
import { CopyField } from './CopyField';
import { describe, it, expect, vi } from 'vitest';

describe('CopyField', () => {
  it('renders input with value and label', () => {
    render(<CopyField label="API Key" value="secret_12345" />);
    expect(screen.getByLabelText('API Key')).toBeInTheDocument();
    expect(screen.getByDisplayValue('secret_12345')).toBeInTheDocument();
  });

  it('renders description helper text', () => {
    render(<CopyField value="secret_12345" description="Use for authorization" />);
    expect(screen.getByText('Use for authorization')).toBeInTheDocument();
  });

  it('copies text to clipboard when copy button is clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyField value="npm install dashkit" showToast={false} />);
    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeTextMock).toHaveBeenCalledWith('npm install dashkit');
  });
});
