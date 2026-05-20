import { motion } from 'framer-motion'
import {
  Users, Briefcase, CalendarDays, TrendingUp, TrendingDown, ArrowRight,
  Activity, Clock, CheckCircle2, AlertCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge }  from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { useAuthStore } from '../store/useAuthStore'
import { useClientes }  from '../features/clientes/hooks/useClientes'
import { useServicios } from '../features/servicios/hooks/useServicios'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts'

const areaData = [
  { mes: 'Ene', ingresos: 4200000 }, { mes: 'Feb', ingresos: 5800000 },
  { mes: 'Mar', ingresos: 4900000 }, { mes: 'Abr', ingresos: 7100000 },
  { mes: 'May', ingresos: 6300000 }, { mes: 'Jun', ingresos: 8900000 },
]

const barData = [
  { estado: 'Pendientes',   count: 5, color: '#F59E0B' },
  { estado: 'En progreso',  count: 8, color: '#3B6FD4' },
  { estado: 'Completados',  count: 12, color: '#10B981' },
]

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item      = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

interface KPIProps {
  label: string; value: string; change: number; icon: React.ReactNode; color: string
}
const KPICard = ({ label, value, change, icon, color }: KPIProps) => (
  <motion.div variants={item}>
    <Card className="flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-surface-500 font-medium">{label}</p>
        <p className="font-display font-bold text-surface-100 text-xl mt-0.5">{value}</p>
        <div className="flex items-center gap-1 mt-1">
          {change >= 0
            ? <TrendingUp size={11} className="text-emerald-400" />
            : <TrendingDown size={11} className="text-danger" />}
          <span className={`text-[10px] font-medium ${change >= 0 ? 'text-emerald-400' : 'text-danger'}`}>
            {Math.abs(change)}% vs mes anterior
          </span>
        </div>
      </div>
    </Card>
  </motion.div>
)

const recentActivity = [
  { user: 'María García', action: 'creó un nuevo servicio', time: 'hace 5 min', type: 'success' as const },
  { user: 'Carlos Rodríguez', action: 'actualizó su perfil', time: 'hace 22 min', type: 'info' as const },
  { user: 'Sistema', action: 'generó backup automático', time: 'hace 1h', type: 'default' as const },
  { user: 'Ana Martínez', action: 'completó el servicio #12', time: 'hace 2h', type: 'success' as const },
  { user: 'Admin', action: 'agregó usuario nuevo', time: 'hace 3h', type: 'warning' as const },
]

export default function DashboardPage() {
  const { user }                        = useAuthStore()
  const { data: clientes = [] }         = useClientes()
  const { data: servicios = [] }        = useServicios()
  const navigate                        = useNavigate()

  const activosCount   = clientes.filter(c => c.estado === 'activo').length
  const pendientes     = servicios.filter(s => s.estado === 'pendiente').length
  const enProgreso     = servicios.filter(s => s.estado === 'en_progreso').length
  const completados    = servicios.filter(s => s.estado === 'completado').length
  const ingresos       = servicios.filter(s => s.estado === 'completado').reduce((a, s) => a + s.precio, 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="p-6 space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-surface-500 font-medium">{greeting}</p>
          <h1 className="font-display font-bold text-2xl text-surface-100 mt-0.5">
            {user?.nombre?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-surface-400 mt-1">
            Aquí tienes el resumen de hoy — {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <Button
          leftIcon={<CalendarDays size={14} />}
          rightIcon={<ArrowRight size={12} />}
          size="sm"
          variant="secondary"
          onClick={() => navigate('/calendario')}
        >
          Ver calendario
        </Button>
      </div>

      {/* KPIs */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard label="Clientes activos"   value={String(activosCount)} change={12}  color="bg-brand-600/15 text-brand-400"   icon={<Users size={20} />} />
        <KPICard label="Servicios activos"  value={String(enProgreso)}   change={-4}  color="bg-violet-600/15 text-violet-400" icon={<Briefcase size={20} />} />
        <KPICard label="Pendientes"         value={String(pendientes)}   change={8}   color="bg-amber-500/15 text-amber-400"   icon={<Clock size={20} />} />
        <KPICard label="Ingresos del mes"   value={formatCOP(ingresos)}  change={22}  color="bg-emerald-600/15 text-emerald-400" icon={<TrendingUp size={20} />} />
      </motion.div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <Card className="lg:col-span-2" padding="none">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle>Ingresos mensuales</CardTitle>
            <Badge variant="success" dot size="sm">En tiempo real</Badge>
          </CardHeader>
          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3B6FD4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B6FD4" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} width={40} />
                <Tooltip
                  formatter={(v: number) => [formatCOP(v), 'Ingresos']}
                  contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Area type="monotone" dataKey="ingresos" stroke="#3B6FD4" fill="url(#grad)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#3B6FD4' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar chart */}
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle>Servicios</CardTitle>
          </CardHeader>
          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="estado" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} width={24} />
                <Tooltip
                  contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3B6FD4">
                  {barData.map((entry, i) => (
                    <rect key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle>Actividad reciente</CardTitle>
            <Activity size={16} className="text-surface-500" />
          </CardHeader>
          <div className="divide-y divide-white/[0.04]">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={a.user} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-surface-200 truncate">
                    <span className="font-medium">{a.user}</span>{' '}
                    <span className="text-surface-400">{a.action}</span>
                  </p>
                  <p className="text-[10px] text-surface-600 mt-0.5">{a.time}</p>
                </div>
                <Badge variant={a.type} size="sm" dot />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick stats */}
        <Card padding="none">
          <CardHeader className="px-5 pt-5 pb-4">
            <CardTitle>Resumen de servicios</CardTitle>
          </CardHeader>
          <div className="px-5 pb-5 space-y-4">
            {[
              { label: 'Completados', count: completados, total: servicios.length, color: 'bg-emerald-500', icon: <CheckCircle2 size={14} className="text-emerald-400" /> },
              { label: 'En progreso', count: enProgreso,  total: servicios.length, color: 'bg-brand-500',   icon: <Activity size={14} className="text-brand-400" /> },
              { label: 'Pendientes',  count: pendientes,  total: servicios.length, color: 'bg-amber-500',   icon: <AlertCircle size={14} className="text-amber-400" /> },
            ].map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-xs text-surface-300 font-medium">{s.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-surface-200">{s.count}/{s.total}</span>
                </div>
                <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${s.color}`}
                    style={{ width: `${s.total ? (s.count / s.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              size="sm"
              fullWidth
              rightIcon={<ArrowRight size={12} />}
              onClick={() => navigate('/servicios')}
              className="mt-2"
            >
              Ver todos los servicios
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
