import { render, screen } from '@testing-library/react';
import { SystemLogs } from './SystemLogs';

describe('SystemLogs', () => {
  const mockLogs = [
    { type: 'ok', message: 'System healthy', timestamp: '10:00' } as const
  ];

  it('renders logs with title', () => {
    render(<SystemLogs logs={mockLogs} title="Server A" />);
    expect(screen.getByText('Server A')).toBeInTheDocument();
    expect(screen.getByText('System healthy')).toBeInTheDocument();
    expect(screen.getByText('[OK]')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders session and status', () => {
    render(<SystemLogs logs={mockLogs} session="abc-123" status="Running" />);
    expect(screen.getByText('session: abc-123')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
  });
});
