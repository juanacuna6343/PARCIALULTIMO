import clsx from 'clsx'

interface AvatarProps {
  name?:     string
  src?:      string
  size?:     'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-12 h-12 text-base',
}

function getInitials(name = '') {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function getColor(name = '') {
  const colors = [
    'from-brand-600 to-brand-800',
    'from-violet-600 to-violet-800',
    'from-emerald-600 to-emerald-800',
    'from-amber-600 to-amber-800',
    'from-rose-600 to-rose-800',
    'from-cyan-600 to-cyan-800',
  ]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export const Avatar = ({ name, src, size = 'md', className }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'Avatar'}
        className={clsx('rounded-full object-cover ring-2 ring-white/10 flex-shrink-0', sizeMap[size], className)}
      />
    )
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-display font-semibold text-white flex-shrink-0 bg-gradient-to-br',
        getColor(name),
        sizeMap[size],
        className,
      )}
      aria-label={name}
      role="img"
    >
      {getInitials(name)}
    </div>
  )
}
