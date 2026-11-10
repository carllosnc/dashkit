import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        'ds-rounded',
        'ds-rounded-sm',
        'ds-rounded-md',
        'ds-rounded-lg',
        'ds-rounded-xl',
        'ds-rounded-2xl',
      ],
      'bg-image': ['ds-primary-gradient', 'ds-danger-gradient'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
