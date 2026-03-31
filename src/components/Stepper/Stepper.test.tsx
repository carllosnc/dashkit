import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper, Step } from './Stepper';

describe('Stepper', () => {
  it('renders correctly', () => {
    render(
      <Stepper activeStep={1}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
      </Stepper>
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('triggers onChange correctly when a step is clicked', () => {
    // @ts-expect-error - bun test polyfills jest
    const handleChange = jest.fn();
    render(
      <Stepper activeStep={0} onChange={handleChange}>
        <Step title="S1" />
        <Step title="S2" />
      </Stepper>
    );

    fireEvent.click(screen.getByText('S2'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('does not trigger onChange if not provided', () => {
    render(
      <Stepper activeStep={0}>
        <Step title="S1" />
        <Step title="S2" />
      </Stepper>
    );

    fireEvent.click(screen.getByText('S2'));
    // Should not throw
    expect(screen.getByText('S2')).toBeInTheDocument();
  });
});
