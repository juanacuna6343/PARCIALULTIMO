import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export interface Tab {
  id:       string
  label:    string
  icon?:    ReactNode
  count?:   number
  disabled?: boolean
}

interface TabsProps {
  tabs:      Tab[]
  activeTab: string
  onChange:  (id: string) => void
  className?: string
}

export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => (
  <div className={clsx('flex items-center gap-1 bg-surface-800/60 rounded-xl p-1 border border-white/[0.06]', className)}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        disabled={tab.disabled}
        onClick={() => !tab.disabled && onChange(tab.id)}
        className={clsx(
          'relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 flex-1 justify-center',
          tab.disabled
            ? 'opacity-40 cursor-not-allowed text-surface-500'
            : activeTab === tab.id
            ? 'text-white'
            : 'text-surface-400 hover:text-surface-200',
        )}
        aria-selected={activeTab === tab.id}
        role="tab"
      >
        {activeTab === tab.id && (
          <motion.span
            layoutId="tab-active"
            className="absolute inset-0 bg-brand-600 rounded-lg"
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          />
        )}
        <span className="relative flex items-center gap-1.5">
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={clsx(
              'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface-700 text-surface-400',
            )}>
              {tab.count}
            </span>
          )}
        </span>
      </button>
    ))}
  </div>
)

/** Tabs con underline (estilo alternativo) */
export const TabsUnderline = ({ tabs, activeTab, onChange, className }: TabsProps) => (
  <div className={clsx('flex items-center gap-0 border-b border-white/[0.06]', className)}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        disabled={tab.disabled}
        onClick={() => !tab.disabled && onChange(tab.id)}
        className={clsx(
          'relative flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors duration-150',
          tab.disabled ? 'opacity-40 cursor-not-allowed' : '',
          activeTab === tab.id ? 'text-brand-400' : 'text-surface-400 hover:text-surface-200',
        )}
        role="tab"
        aria-selected={activeTab === tab.id}
      >
        {tab.icon}
        {tab.label}
        {tab.count !== undefined && (
          <span className="bg-surface-700 text-surface-400 rounded-full px-1.5 py-0.5 text-[10px] leading-none">
            {tab.count}
          </span>
        )}
        {activeTab === tab.id && (
          <motion.span
            layoutId="tab-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-t-full"
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          />
        )}
      </button>
    ))}
  </div>
)
