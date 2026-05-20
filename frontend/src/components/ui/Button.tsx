import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:   'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm',
        secondary: 'bg-surface-800 text-surface-100 border border-white/10 hover:bg-surface-700 active:bg-surface-600',
        ghost:     'bg-transparent text-surface-300 hover:bg-white/[0.06] hover:text-surface-100',
        danger:    'bg-danger/10 text-danger border border-danger/20 hover:bg-danger hover:text-white',
        outline:   'border border-brand-600/50 text-brand-400 hover:bg-brand-600/10',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-sm',
        xl: 'h-11 px-6 text-base',
      },
      fullWidth: { true: 'w-full' },
      iconOnly:  { true: 'aspect-square px-0' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, iconOnly, isLoading, leftIcon, rightIcon, children, disabled, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx(buttonVariants({ variant, size, fullWidth, iconOnly }), className)}
      {...rest}
    >
      {isLoading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  ),
)
Button.displayName = 'Button'
