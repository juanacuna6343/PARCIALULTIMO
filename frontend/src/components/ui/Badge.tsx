import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium tracking-wide',
  {
    variants: {
      variant: {
        default:  'bg-surface-700 text-surface-300',
        success:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
        warning:  'bg-amber-500/15 text-amber-400 border border-amber-500/20',
        danger:   'bg-red-500/15 text-red-400 border border-red-500/20',
        info:     'bg-brand-600/15 text-brand-400 border border-brand-500/20',
        purple:   'bg-violet-500/15 text-violet-400 border border-violet-500/20',
        gray:     'bg-surface-800 text-surface-400 border border-white/8',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      dot: { true: '' },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, size, dot, children, ...rest }: BadgeProps) => (
  <span className={clsx(badgeVariants({ variant, size, dot }), className)} {...rest}>
    {dot && (
      <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-emerald-400': variant === 'success',
        'bg-amber-400':   variant === 'warning',
        'bg-red-400':     variant === 'danger',
        'bg-brand-400':   variant === 'info',
        'bg-violet-400':  variant === 'purple',
        'bg-surface-400': !variant || variant === 'default' || variant === 'gray',
      })} />
    )}
    {children}
  </span>
)
