import { type ReactNode } from 'react'
import { PackageOpen } from 'lucide-react'
import clsx from 'clsx'

interface EmptyStateProps {
  icon?:        ReactNode
  title:        string
  description?: string
  action?:      ReactNode
  className?:   string
  compact?:     boolean
}

export const EmptyState = ({
  icon, title, description, action, className, compact = false,
}: EmptyStateProps) => (
  <div className={clsx(
    'flex flex-col items-center justify-center text-center',
    compact ? 'py-10 gap-3' : 'py-20 gap-4',
    className,
  )}>
    <div className={clsx(
      'rounded-2xl bg-surface-800/60 border border-white/[0.06] flex items-center justify-center text-surface-500',
      compact ? 'w-12 h-12' : 'w-16 h-16',
    )}>
      {icon ?? <PackageOpen size={compact ? 20 : 28} />}
    </div>
    <div className="space-y-1.5">
      <p className={clsx('font-display font-semibold text-surface-200', compact ? 'text-sm' : 'text-base')}>
        {title}
      </p>
      {description && (
        <p className={clsx('text-surface-500 max-w-xs', compact ? 'text-xs' : 'text-sm')}>
          {description}
        </p>
      )}
    </div>
    {action}
  </div>
)
