import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges standard tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('allows standard rounded-* classes to override ds-rounded* utilities', () => {
    expect(cn('ds-rounded', 'rounded-full')).toBe('rounded-full');
    expect(cn('ds-rounded-lg', 'rounded-none')).toBe('rounded-none');
    expect(cn('rounded-xl', 'ds-rounded-sm')).toBe('ds-rounded-sm');
  });

  it('allows bg-none to override ds-primary-gradient and ds-danger-gradient', () => {
    expect(cn('ds-primary-gradient', 'bg-none')).toBe('bg-none');
    expect(cn('ds-danger-gradient', 'bg-none')).toBe('bg-none');
  });
});
