import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Avatar, type AvatarProps, type AvatarSize } from './Avatar';

const avatarGroupVariants = cva(
  'flex items-center [&_.ds-avatar]:ring-2 [&_.ds-avatar]:ring-background [&_.ds-avatar]:border dark:[&_.ds-avatar]:border-ds-800',
  {
    variants: {
      spacing: {
        sm: '-space-x-1.5',
        md: '-space-x-3',
        lg: '-space-x-4',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  spacing?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ children, max, size = 'md', spacing = 'md', className, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div className={cn(avatarGroupVariants({ spacing }), className)} {...props}>
      {visibleAvatars.map((child, i) => (
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
          size,
          style: { zIndex: childrenArray.length - i }
        }) : child
      ))}
      {remainingCount > 0 && (
        <Avatar
          fallback={`+${remainingCount}`}
          size={size}
          className="bg-ds-900 text-white z-0 text-[10px] dark:bg-white dark:text-ds-900"
        />
      )}
    </div>
  );
}
