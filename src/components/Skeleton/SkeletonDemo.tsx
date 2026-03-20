import { Skeleton } from './Skeleton';

export const SkeletonDemo = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Profile Card Skeleton */}
      <div className="flex items-center gap-4 p-4 rounded-xl border border-base-200 dark:border-base-800 bg-white dark:bg-base-950">
        <Skeleton variant="circular" className="size-12 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-[40%]" />
          <Skeleton variant="text" className="w-[60%]" />
        </div>
      </div>

      {/* Content Block Skeleton */}
      <div className="space-y-4">
        <Skeleton variant="rectangular" className="h-[120px] w-full" />
        <div className="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
};
