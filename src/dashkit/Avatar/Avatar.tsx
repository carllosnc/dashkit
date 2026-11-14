import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const avatarVariants = cva(
  'ds-avatar relative flex shrink-0 items-center justify-center overflow-hidden bg-ds-200/80 border border-border/70 text-foreground dark:bg-ds-800 dark:border-ds-700/80 dark:text-ds-100',
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-16 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-sm',
      },
      bordered: {
        true: 'ring-2 ring-background border dark:border-ds-800',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      bordered: false,
    },
  }
);

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StrictVariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

/**
 * User profile image or fallback initials badge with `size` and `shape` variants.
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.png" alt="Jane Doe" fallback="JD" size="md" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, alt, fallback, size = 'md', shape = 'circle', bordered = false, className, ...props }, ref) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(!src);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useLayoutEffect(() => {
      if (imgRef.current?.complete) {
        setIsLoaded(true);
      }
    }, [src]);

    React.useEffect(() => {
      setIsLoaded(false);
      setHasError(!src);
    }, [src]);

    return (
      <div
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ size, shape, bordered }), className)}
        {...props}
      >
        {src && !hasError && (
          <motion.img
            ref={imgRef}
            key={src}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            className="absolute inset-0 aspect-square h-full w-full object-cover"
          />
        )}

        <AnimatePresence mode="wait">
          {(!isLoaded || hasError || !src) && (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full items-center justify-center font-semibold text-foreground uppercase select-none tracking-tight dark:text-ds-100"
            >
              {fallback || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2) : '?')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
