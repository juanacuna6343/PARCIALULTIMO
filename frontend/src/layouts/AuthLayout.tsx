import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface AuthLayoutProps { children: ReactNode }

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Background blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px]" />
    </div>

    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full max-w-md"
    >
      {children}
    </motion.div>
  </div>
)
