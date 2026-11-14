import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioCard, RadioCardGroup } from './RadioCard';

describe('RadioCard', () => {
  it('renders group header label, valueLabel, and option cards', () => {
    render(
      <RadioCardGroup label="Style Preset" valueLabel="Default" defaultValue="default">
        <RadioCard
          value="default"
          title="Default"
          description="Clean & balanced"
          leading={<span data-testid="dot-default" />}
        />
        <RadioCard
          value="brutalism"
          title="Brutalism"
          description="Sharp & high-contrast"
        />
      </RadioCardGroup>
    );

    expect(screen.getByText('Style Preset')).toBeInTheDocument();
    expect(screen.getAllByText('Default').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Clean & balanced')).toBeInTheDocument();
    expect(screen.getByText('Brutalism')).toBeInTheDocument();
    expect(screen.getByTestId('dot-default')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('supports uncontrolled selection with defaultValue', () => {
    render(
      <RadioCardGroup label="Preset" defaultValue="default">
        <RadioCard value="default" title="Default" />
        <RadioCard value="matrix" title="Matrix" />
      </RadioCardGroup>
    );

    const defaultCard = screen.getByRole('radio', { name: /Default/i });
    const matrixCard = screen.getByRole('radio', { name: /Matrix/i });

    expect(defaultCard).toHaveAttribute('aria-checked', 'true');
    expect(matrixCard).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(matrixCard);

    expect(defaultCard).toHaveAttribute('aria-checked', 'false');
    expect(matrixCard).toHaveAttribute('aria-checked', 'true');
  });

  it('supports controlled selection via value and onValueChange', () => {
    const onValueChange = vi.fn();

    render(
      <RadioCardGroup label="Plan" value="starter" onValueChange={onValueChange}>
        <RadioCard value="starter" title="Starter" />
        <RadioCard value="pro" title="Pro" trailing={<span>$29/mo</span>} />
      </RadioCardGroup>
    );

    const proCard = screen.getByRole('radio', { name: /Pro/i });
    expect(screen.getByText('$29/mo')).toBeInTheDocument();

    fireEvent.click(proCard);
    expect(onValueChange).toHaveBeenCalledWith('pro');
  });

  it('prevents selection when item or group is disabled', () => {
    const onValueChange = vi.fn();

    render(
      <RadioCardGroup label="Preset" value="default" onValueChange={onValueChange}>
        <RadioCard value="default" title="Default" />
        <RadioCard value="locked" title="Locked" disabled />
      </RadioCardGroup>
    );

    const lockedCard = screen.getByRole('radio', { name: /Locked/i });
    expect(lockedCard).toBeDisabled();

    fireEvent.click(lockedCard);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('navigates and selects options with arrow keys, Home, and End', () => {
    const onValueChange = vi.fn();

    render(
      <RadioCardGroup label="Preset" defaultValue="default" onValueChange={onValueChange}>
        <RadioCard value="default" title="Default" />
        <RadioCard value="brutalism" title="Brutalism" />
        <RadioCard value="matrix" title="Matrix" />
      </RadioCardGroup>
    );

    const defaultCard = screen.getByRole('radio', { name: /Default/i });
    const brutalismCard = screen.getByRole('radio', { name: /Brutalism/i });
    const matrixCard = screen.getByRole('radio', { name: /Matrix/i });

    defaultCard.focus();
    fireEvent.keyDown(defaultCard, { key: 'ArrowDown' });

    expect(document.activeElement).toBe(brutalismCard);
    expect(brutalismCard).toHaveAttribute('aria-checked', 'true');
    expect(onValueChange).toHaveBeenLastCalledWith('brutalism');

    fireEvent.keyDown(brutalismCard, { key: 'End' });
    expect(document.activeElement).toBe(matrixCard);
    expect(onValueChange).toHaveBeenLastCalledWith('matrix');

    fireEvent.keyDown(matrixCard, { key: 'Home' });
    expect(document.activeElement).toBe(defaultCard);
    expect(onValueChange).toHaveBeenLastCalledWith('default');
  });

  it('renders hidden form input when name is provided and supports indicator variants', () => {
    const { container } = render(
      <RadioCardGroup name="preset" defaultValue="matrix" indicator="check">
        <RadioCard value="default" title="Default" />
        <RadioCard value="matrix" title="Matrix" />
      </RadioCardGroup>
    );

    const hiddenInput = container.querySelector('input[type="hidden"][name="preset"]');
    expect(hiddenInput).toHaveAttribute('value', 'matrix');

    const indicators = container.querySelectorAll('[data-slot="radio-card-indicator"]');
    expect(indicators).toHaveLength(2);
  });
});
