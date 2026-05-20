import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:       string
  error?:       string
  hint?:        string
  leftIcon?:    ReactNode
  rightIcon?:   ReactNode
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, containerClassName, type, id, ...rest }, ref) => {
    const [showPass, setShowPass] = useState(false)
    const isPassword = type === 'password'
    const inputType  = isPassword ? (showPass ? 'text' : 'password') : type

    return (
      <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-surface-300 tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            className={clsx(
              'w-full h-9 rounded-lg bg-surface-800 border text-surface-100 text-sm placeholder:text-surface-600',
              'transition-all duration-150 outline-none',
              'focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30',
              error
                ? 'border-danger/60 focus:border-danger focus:ring-danger/20'
                : 'border-white/10 hover:border-white/20',
              leftIcon  ? 'pl-9'  : 'pl-3',
              (rightIcon || isPassword) ? 'pr-9' : 'pr-3',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            )}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
              aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-danger flex items-center gap-1">{error}</p>}
        {hint && !error && <p className="text-xs text-surface-500">{hint}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
