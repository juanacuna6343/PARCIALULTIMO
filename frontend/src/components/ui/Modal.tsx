import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import clsx from 'clsx'

export interface ModalProps {
  open:       boolean
  onClose:    () => void
  title?:     string
  children:   ReactNode
  footer?:    ReactNode
  size?:      'sm' | 'md' | 'lg' | 'xl'
  /** Prevent closing on backdrop click */
  persistent?: boolean
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const Modal = ({
  open, onClose, title, children, footer, size = 'md', persistent = false,
}: ModalProps) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open && !persistent) onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose, persistent])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !persistent && onClose()}
          />

          {/* Panel */}
          <motion.div
            className={clsx(
              'relative w-full bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]',
              sizeMap[size],
            )}
            initial={prefersReduced ? {} : { scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <h2 className="font-display font-semibold text-surface-100 text-base">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-surface-500 hover:text-surface-200 hover:bg-white/[0.06] rounded-lg p-1 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
