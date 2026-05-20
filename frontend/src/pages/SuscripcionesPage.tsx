import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, CreditCard, DollarSign, Calendar, AlertCircle } from 'lucide-react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Tabs } from '../components/ui/Tabs'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { SkeletonCard } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { useSuscripciones, useCreateSuscripcion, useUpdateSuscripcion, useDeleteSuscripcion } from '../features/suscripciones/hooks/useSuscripciones'
import { useClientes } from '../features/clientes/hooks/useClientes'
import type { Suscripcion, SuscripcionFormData, EstadoSuscripcion, FrecuenciaBillingType } from '../types/suscripcion.types'
import { format, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

const schema = z.object({
  clienteId: z.coerce.number().min(1, 'Selecciona un cliente'),
  nombre: z.string().min(2, 'Nombre requerido'),
  descripcion: z.string().optional(),
  estado: z.enum(['activa', 'cancelada', 'vencida', 'pendiente']),
  valor: z.coerce.number().min(0, 'Valor requerido'),
  frecuencia: z.enum(['mensual', 'trimestral', 'semestral', 'anual']),
  fechaInicio: z.string().min(1, 'Fecha requerida'),
  fechaRenovacion: z.string().min(1, 'Fecha requerida'),
  proximoPago: z.string().min(1, 'Fecha requerida'),
  notas: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const formatDateForInput = (value: string | Date) =>
  typeof value === 'string' ? value.split('T')[0] : value.toISOString().split('T')[0]

const estadoBadge: Record<EstadoSuscripcion, { v: 'success' | 'danger' | 'warning' | 'info'; label: string }> = {
  activa: { v: 'success', label: 'Activa' },
  cancelada: { v: 'danger', label: 'Cancelada' },
  vencida: { v: 'warning', label: 'Vencida' },
  pendiente: { v: 'info', label: 'Pendiente' },
}

const frecuenciaLabel: Record<FrecuenciaBillingType, string> = {
  mensual: 'Mensual',
  trimestral: 'Trimestral',
  semestral: 'Semestral',
  anual: 'Anual',
}

const TABS = [
  { id: 'todas', label: 'Todas' },
  { id: 'activa', label: 'Activas' },
  { id: 'vencida', label: 'Vencidas' },
  { id: 'cancelada', label: 'Canceladas' },
]

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)

interface SuscripcionModalProps { open: boolean; onClose: () => void; suscripcion?: Suscripcion }
const SuscripcionModal = ({ open, onClose, suscripcion }: SuscripcionModalProps) => {
  const isEdit = !!suscripcion
  const { mutate: create, isPending: creating } = useCreateSuscripcion()
  const { mutate: update, isPending: updating } = useUpdateSuscripcion()
  const { data: clientes = [] } = useClientes()

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: suscripcion
      ? {
          clienteId: suscripcion.clienteId,
          nombre: suscripcion.nombre,
          descripcion: suscripcion.descripcion ?? '',
          estado: suscripcion.estado,
          valor: suscripcion.valor,
          frecuencia: suscripcion.frecuencia,
          fechaInicio: formatDateForInput(suscripcion.fechaInicio),
          fechaRenovacion: formatDateForInput(suscripcion.fechaRenovacion),
          proximoPago: formatDateForInput(suscripcion.proximoPago),
          notas: suscripcion.notas ?? '',
        }
      : {
          clienteId: 0,
          nombre: '',
          descripcion: '',
          estado: 'activa',
          valor: 0,
          frecuencia: 'mensual',
          fechaInicio: '',
          fechaRenovacion: '',
          proximoPago: '',
          notas: '',
        },
  })

  const onSubmit = (data: FormData) => {
    if (isEdit && suscripcion) update({ id: suscripcion.id, data }, { onSuccess: () => { onClose(); reset() } })
    else create(data as SuscripcionFormData, { onSuccess: () => { onClose(); reset() } })
  }

  const clienteOptions = clientes.map(c => ({ value: c.id.toString(), label: c.nombre }))
  const frecuenciaOpts = Object.entries(frecuenciaLabel).map(([value, label]) => ({ value, label }))

  return (
    <Modal
      open={open} onClose={onClose}
      title={isEdit ? 'Editar suscripción' : 'Nueva suscripción'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar' : 'Crear suscripción'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Select 
          id="suc-cliente" 
          label="Cliente *" 
          options={clienteOptions} 
          value={watch('clienteId')?.toString() || ''} 
          onChange={v => setValue('clienteId', Number(v))}
          error={errors.clienteId?.message}
        />
        <Input {...register('nombre')} id="suc-nombre" label="Nombre del plan *" placeholder="Ej: Plan Premium" error={errors.nombre?.message} />
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('valor')} id="suc-valor" label="Valor (COP) *" type="number" placeholder="0" error={errors.valor?.message} leftIcon={<DollarSign size={13} />} />
          <Select id="suc-freq" label="Frecuencia *" options={frecuenciaOpts} value={watch('frecuencia')} onChange={v => setValue('frecuencia', v as FrecuenciaBillingType)} error={errors.frecuencia?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('fechaInicio')} id="suc-fi" label="Fecha inicio *" type="date" error={errors.fechaInicio?.message} />
          <Input {...register('proximoPago')} id="suc-pp" label="Próximo pago *" type="date" error={errors.proximoPago?.message} />
        </div>
        <Input {...register('fechaRenovacion')} id="suc-fr" label="Fecha renovación *" type="date" error={errors.fechaRenovacion?.message} />
        <textarea {...register('descripcion')} id="suc-desc" rows={2} placeholder="Descripción..." className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
      </div>
    </Modal>
  )
}

export default function SuscripcionesPage() {
  const { data: suscripciones = [], isLoading, isError, refetch } = useSuscripciones()
  const { mutate: del, isPending: deleting } = useDeleteSuscripcion()

  const [activeTab, setActiveTab] = useState('todas')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Suscripcion | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Suscripcion | undefined>()

  const filtered = suscripciones.filter(s => activeTab === 'todas' || s.estado === activeTab)
  const counts = TABS.reduce((acc, t) => ({ ...acc, [t.id]: t.id === 'todas' ? suscripciones.length : suscripciones.filter(s => s.estado === t.id).length }), {} as Record<string, number>)

  const mrrTotal = suscripciones.filter(s => s.estado === 'activa').reduce((acc, s) => {
    const factor = { mensual: 1, trimestral: 0.33, semestral: 0.167, anual: 0.083 }
    return acc + (s.valor * factor[s.frecuencia])
  }, 0)

  const proximasRenovaciones = suscripciones
    .filter(s => s.estado === 'activa')
    .map(s => ({ ...s, dias: differenceInDays(new Date(s.proximoPago), new Date()) }))
    .filter(s => s.dias <= 14 && s.dias > 0)
    .sort((a, b) => a.dias - b.dias)

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Suscripciones</h1>
          <p className="text-sm text-surface-500 mt-0.5">{suscripciones.length} suscripciones • MRR: {formatCOP(mrrTotal)}</p>
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => { setEditTarget(undefined); setModalOpen(true) }}>
          Nueva suscripción
        </Button>
      </div>

      {proximasRenovaciones.length > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 flex gap-3">
          <AlertCircle size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <p className="font-medium text-surface-100">{proximasRenovaciones.length} renovaciones próximas</p>
            <p className="text-surface-500 text-xs mt-0.5">
              {proximasRenovaciones.map(s => `${s.clienteNombre} (${s.dias}d)`).join(', ')}
            </p>
          </div>
        </div>
      )}

      <Tabs
        tabs={TABS.map(t => ({ ...t, count: counts[t.id] }))}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState icon={<CreditCard size={28} />} title="Error al cargar" description="No se pudieron cargar las suscripciones" action={<Button size="sm" variant="secondary" onClick={() => refetch()}>Reintentar</Button>} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<CreditCard size={28} />} title="Sin suscripciones" description="No hay suscripciones en esta categoría" action={<Button size="sm" leftIcon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Crear suscripción</Button>} />
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {filtered.map((s) => {
            const badge = estadoBadge[s.estado]
            const diasRestantes = differenceInDays(new Date(s.proximoPago), new Date())
            const isProximo = s.estado === 'activa' && diasRestantes <= 14 && diasRestantes > 0

            return (
              <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <Card hoverable className={`h-full flex flex-col ${isProximo ? 'ring-1 ring-warning/50' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                      <CreditCard size={18} className="text-brand-400" />
                    </div>
                    <Badge variant={badge.v} dot size="sm">{badge.label}</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-surface-100 text-sm mb-1">{s.nombre}</h3>
                  {s.descripcion && <p className="text-xs text-surface-400 mb-3 line-clamp-1">{s.descripcion}</p>}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-surface-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
                      {s.clienteNombre}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-[10px] text-surface-600 uppercase tracking-wider font-medium">Frecuencia</p>
                        <p className="text-xs font-medium text-surface-300">{frecuenciaLabel[s.frecuencia]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-surface-600 uppercase tracking-wider font-medium">Próximo pago</p>
                        <p className="text-xs font-medium text-surface-300">{format(new Date(s.proximoPago), 'd MMM', { locale: es })}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="font-display font-bold text-base text-surface-100">{formatCOP(s.valor)}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="xs" iconOnly onClick={() => { setEditTarget(s); setModalOpen(true) }}>
                          <Pencil size={12} />
                        </Button>
                        <Button variant="ghost" size="xs" iconOnly onClick={() => setDeleteTarget(s)} className="hover:text-danger">
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <SuscripcionModal open={modalOpen} onClose={() => { setModalOpen(false); setEditTarget(undefined) }} suscripcion={editTarget} />
      {deleteTarget && (
        <ConfirmModal
          open={!!deleteTarget}
          title="Eliminar suscripción"
          message={`¿Eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          isLoading={deleting}
          onConfirm={() => {
            del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) })
          }}
          onClose={() => setDeleteTarget(undefined)}
        />
      )}
    </div>
  )
}
