import clsx from 'clsx'

interface SkeletonProps { className?: string }

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={clsx('rounded-lg bg-surface-800 animate-pulse', className)} />
)

export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={clsx('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={clsx('h-3', i === lines - 1 ? 'w-3/4' : 'w-full')} />
    ))}
  </div>
)

export const SkeletonCard = ({ className }: SkeletonProps) => (
  <div className={clsx('rounded-xl border border-white/[0.06] bg-surface-900 p-5 space-y-4', className)}>
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-2.5 w-1/3" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
)

export const SkeletonTable = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="rounded-xl border border-white/[0.06] overflow-hidden">
    <div className="bg-surface-800/50 p-4 flex gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-3 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border-t border-white/[0.04]">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className={clsx('h-3 flex-1', j === 0 && 'w-1/3 flex-none')} />
        ))}
      </div>
    ))}
  </div>
)
