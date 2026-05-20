import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

export interface SelectOption {
  value:    string | number
  label:    string
  icon?:    ReactNode
  disabled?: boolean
}

export interface SelectProps {
  options:     SelectOption[]
  value?:      string | number
  onChange?:   (value: string | number) => void
  placeholder?: string
  label?:      string
  error?:      string
  disabled?:   boolean
  className?:  string
  id?:         string
}

export const Select = ({
  options, value, onChange, placeholder = 'Selecciona...', label, error, disabled, className, id,
}: SelectProps) => {
  const [open, setOpen]  = useState(false)
  const ref              = useRef<HTMLDivElement>(null)
  const selected         = options.find((o) => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={clsx('flex flex-col gap-1.5', className)} ref={ref}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-surface-300 tracking-wide">
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'w-full h-9 rounded-lg bg-surface-800 border text-sm text-left px-3 flex items-center justify-between gap-2',
          'transition-all duration-150 outline-none',
          error
            ? 'border-danger/60 focus:border-danger'
            : open
            ? 'border-brand-500 ring-1 ring-brand-500/30'
            : 'border-white/10 hover:border-white/20',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={clsx('flex items-center gap-2 truncate', !selected && 'text-surface-600')}>
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={14}
          className={clsx('text-surface-500 flex-shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] mt-1 w-full bg-surface-800 border border-white/[0.08] rounded-lg shadow-xl py-1 max-h-52 overflow-auto"
            style={{ position: 'relative' }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  if (!opt.disabled) { onChange?.(opt.value); setOpen(false) }
                }}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors',
                  opt.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/[0.06]',
                  opt.value === value ? 'text-brand-400' : 'text-surface-200',
                )}
              >
                {opt.icon}
                <span className="flex-1 truncate">{opt.label}</span>
                {opt.value === value && <Check size={12} className="text-brand-400 flex-shrink-0" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
