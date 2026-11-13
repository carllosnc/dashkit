import type { VariantProps } from 'class-variance-authority';

/**
 * Extracts strict literal union types from a CVA variant function,
 * stripping `null` so invalid or nullish values are rejected at compile time.
 */
export type StrictVariantProps<T extends (...args: never[]) => unknown> = {
  [K in keyof VariantProps<T>]?: Exclude<VariantProps<T>[K], null | undefined>;
};
