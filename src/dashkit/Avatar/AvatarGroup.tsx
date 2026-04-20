import * as React from 'react';
import { cn } from '../utils/cn';
import { Avatar, type AvatarProps, type AvatarSize } from './Avatar';

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
    <div className={cn('avatar-group', `avatar-group--${spacing}`, className)} {...props}>
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
          className="avatar-group__remaining"
        />
      )}
    </div>
  );
}
