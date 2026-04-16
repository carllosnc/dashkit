import * as React from 'react';
import { cn } from '../utils/cn';
import { Avatar, type AvatarProps, type AvatarSize } from './Avatar';

const SPACING_SM = '-space-x-1.5';
const SPACING_MD = '-space-x-3';
const SPACING_LG = '-space-x-4';

const spacingMap = {
  sm: SPACING_SM,
  md: SPACING_MD,
  lg: SPACING_LG
};

const GROUP_ROOT = "flex items-center";
const REMAINING_STYLE = "bg-ds-900 text-white dark:bg-white dark:text-ds-900 z-0 text-[10px]";

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
    <div className={cn(GROUP_ROOT, spacingMap[spacing], className)} {...props}>
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
          className={REMAINING_STYLE}
        />
      )}
    </div>
  );
}
