import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Aplica efecto glass (blur + border translúcido) */
  glass?: boolean
  /** Hover lift effect */
  hoverable?: boolean
  /** Padding interno */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = ({
  className,
  glass = false,
  hoverable = false,
  padding = 'md',
  children,
  ...rest
}: CardProps) => (
  <div
    className={clsx(
      'rounded-xl border',
      glass
        ? 'bg-surface-900/60 backdrop-blur-xl border-white/[0.06]'
        : 'bg-surface-900 border-white/[0.06]',
      hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-white/[0.1] cursor-pointer',
      {
        'p-0':   padding === 'none',
        'p-4':   padding === 'sm',
        'p-5':   padding === 'md',
        'p-6':   padding === 'lg',
      },
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

export const CardHeader = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex items-center justify-between mb-4', className)} {...rest}>
    {children}
  </div>
)

export const CardTitle = ({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx('font-display font-semibold text-surface-100 text-base', className)} {...rest}>
    {children}
  </h3>
)
