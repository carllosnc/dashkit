import { render, act } from '@testing-library/react';
import { AnimateNumber } from './index';
import { expect, test } from 'vitest';

test('renders initial value', () => {
  const { container } = render(<AnimateNumber value={100} duration={0.1} />);
  // The value is split into digits, so we check the textContent of the container
  expect(container.textContent).toMatch(/100/);
});

test('applies prefix and suffix', async () => {
  const { container } = render(<AnimateNumber value={50} prefix="$" suffix="%" duration={0.01} />);

  // Wait for animation frame
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  expect(container.textContent).toBe('$50%');
});

test('handles precision', async () => {
  const { container } = render(<AnimateNumber value={10.55} precision={1} duration={0.01} />);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  expect(container.textContent).toBe('10.6');
});
