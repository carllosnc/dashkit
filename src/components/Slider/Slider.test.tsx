import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders slider input', () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('shows description', () => {
    render(<Slider description="Adjust volume" />);
    expect(screen.getByText('Adjust volume')).toBeInTheDocument();
  });

  it('shows value text', () => {
    render(<Slider showValue defaultValue={50} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
