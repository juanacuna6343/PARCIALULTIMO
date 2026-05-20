import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Briefcase, CalendarDays, UserCog,
  Settings, LogOut, Menu, X, ChevronRight, Bell, Sun, Moon, CreditCard, Megaphone, TrendingUp,
} from 'lucide-react'
import clsx from 'clsx'
import { useAuthStore } from '../store/useAuthStore'
import { useUIStore }  from '../store/useUIStore'
import { Avatar }      from '../components/ui/Avatar'

const navItems = [
  { label: 'Dashboard',      icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Clientes',       icon: Users,            path: '/clientes'  },
  { label: 'Servicios',      icon: Briefcase,        path: '/servicios' },
  { label: 'Suscripciones',  icon: CreditCard,       path: '/suscripciones' },
  { label: 'Eventos',        icon: Megaphone,        path: '/eventos' },
  { label: 'Pipeline',       icon: TrendingUp,       path: '/pipeline' },
  { label: 'Calendario',     icon: CalendarDays,     path: '/calendario'},
  { label: 'Usuarios',       icon: UserCog,          path: '/usuarios'  },
]

const SIDEBAR_W  = 240
const SIDEBAR_IC = 72

/** Brand logo SVG inline */
const Logo = ({ collapsed }: { collapsed: boolean }) => (
  <div className={clsx('flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]', collapsed && 'justify-center px-0')}>
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0 shadow-glow">
      <span className="font-display font-black text-white text-sm">S</span>
    </div>
    {!collapsed && (
      <div>
        <p className="font-display font-bold text-white text-sm leading-none">SGDI</p>
        <p className="text-[9px] text-surface-500 font-medium tracking-widest uppercase leading-none mt-0.5">BETA 1</p>
      </div>
    )}
  </div>
)

export const AppLayout = () => {
  const { user, logout }          = useAuthStore()
  const { sidebarOpen, toggleSidebar, toggleTheme, theme } = useUIStore()
  const navigate                  = useNavigate()
  const collapsed                 = !sidebarOpen

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-surface-950 overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? SIDEBAR_IC : SIDEBAR_W }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="flex-shrink-0 flex flex-col bg-surface-900 border-r border-white/[0.06] z-30 overflow-hidden"
      >
        <Logo collapsed={collapsed} />

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-2">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 group relative',
                  isActive
                    ? 'bg-brand-600/15 text-brand-400'
                    : 'text-surface-400 hover:bg-white/[0.04] hover:text-surface-200',
                  collapsed && 'justify-center px-0',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-500 rounded-r-full"
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    />
                  )}
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{label}</span>
                  )}
                  {!collapsed && isActive && (
                    <ChevronRight size={12} className="ml-auto text-brand-500/60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mx-2 my-1" />

        {/* Settings */}
        <div className="px-2 pb-2">
          <button
            onClick={() => {}}
            title={collapsed ? 'Configuración' : undefined}
            className={clsx(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-surface-400 hover:bg-white/[0.04] hover:text-surface-200 transition-colors text-sm',
              collapsed && 'justify-center px-0',
            )}
          >
            <Settings size={18} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium">Configuración</span>}
          </button>
        </div>

        {/* User card */}
        <div className={clsx('border-t border-white/[0.06] p-3', collapsed && 'flex justify-center')}>
          {collapsed ? (
            <Avatar name={user?.nombre} size="sm" />
          ) : (
            <div className="flex items-center gap-2.5">
              <Avatar name={user?.nombre} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-surface-200 truncate">{user?.nombre}</p>
                <p className="text-[10px] text-surface-500 truncate capitalize">{user?.rol}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-surface-500 hover:text-danger transition-colors p-1 rounded"
                aria-label="Cerrar sesión"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-surface-900/80 backdrop-blur border-b border-white/[0.06] flex items-center px-4 gap-3 flex-shrink-0 z-20">
          <button
            onClick={toggleSidebar}
            className="text-surface-400 hover:text-surface-200 hover:bg-white/[0.06] rounded-lg p-1.5 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex-1" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-surface-400 hover:text-surface-200 hover:bg-white/[0.06] rounded-lg p-1.5 transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notifications */}
          <button
            className="relative text-surface-400 hover:text-surface-200 hover:bg-white/[0.06] rounded-lg p-1.5 transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-500 rounded-full" />
          </button>

          <div className="w-px h-5 bg-white/[0.08]" />
          <Avatar name={user?.nombre} size="xs" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
