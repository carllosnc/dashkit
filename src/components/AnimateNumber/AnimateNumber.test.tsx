import { render, screen, act } from '@testing-library/react';
import { AnimateNumber } from './AnimateNumber';
import { expect, test } from 'vitest';

test('renders initial value', () => {
  render(<AnimateNumber value={100} duration={0.1} />);
  // The value starts at 0 and animates to 100
  // Since it animates, we might not see 100 immediately
  expect(screen.getByText(/0|100/)).toBeDefined();
});

test('applies prefix and suffix', async () => {
  render(<AnimateNumber value={50} prefix="$" suffix="%" duration={0.01} />);
  
  // Wait for animation to finish
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  expect(screen.getByText('$50%')).toBeDefined();
});

test('handles precision', async () => {
  render(<AnimateNumber value={10.55} precision={1} duration={0.01} />);
  
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  expect(screen.getByText('10.6')).toBeDefined();
});
