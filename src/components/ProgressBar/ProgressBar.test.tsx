import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders correctly', () => {
    const { container } = render(<ProgressBar value={50} />);
    const progressBarContainer = container.querySelector('.bg-ds-200');
    expect(progressBarContainer).toBeInTheDocument();
  });

  it('shows label when showLabel is true', () => {
    render(<ProgressBar value={50} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
  
  it('shows custom label text', () => {
    render(<ProgressBar value={50} label="Uploading" />);
    expect(screen.getByText('Uploading')).toBeInTheDocument();
  });
});
