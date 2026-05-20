import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Calendar as CalendarIcon, MapPin, Users, Clock, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
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
import { useEventos, useCreateEvento, useUpdateEvento, useDeleteEvento } from '../features/eventos/hooks/useEventos'
import type { Evento, EventoFormData, EstadoEvento } from '../types/evento.types'
import { format, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  descripcion: z.string().optional(),
  estado: z.enum(['proximo', 'realizado', 'cancelado']),
  fecha: z.string().min(1, 'Fecha requerida'),
  hora: z.string().min(1, 'Hora requerida'),
  ubicacion: z.string().min(2, 'Ubicación requerida'),
  cupo: z.coerce.number().min(1, 'Cupo mínimo 1'),
  valor: z.coerce.number().optional(),
  organizador: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const estadoBadge: Record<EstadoEvento, { v: 'success' | 'info' | 'danger'; label: string }> = {
  proximo: { v: 'info', label: 'Próximo' },
  realizado: { v: 'success', label: 'Realizado' },
  cancelado: { v: 'danger', label: 'Cancelado' },
}

const TABS = [
  { id: 'todos', label: 'Todos' },
  { id: 'proximo', label: 'Próximos' },
  { id: 'realizado', label: 'Realizados' },
  { id: 'cancelado', label: 'Cancelados' },
]

const formatCOP = (v?: number) =>
  v ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v) : 'Gratis'

interface EventoModalProps { open: boolean; onClose: () => void; evento?: Evento }
const EventoModal = ({ open, onClose, evento }: EventoModalProps) => {
  const isEdit = !!evento
  const { mutate: create, isPending: creating } = useCreateEvento()
  const { mutate: update, isPending: updating } = useUpdateEvento()

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: evento
      ? {
          nombre: evento.nombre,
          descripcion: evento.descripcion ?? '',
          estado: evento.estado,
          fecha: evento.fecha,
          hora: evento.hora,
          ubicacion: evento.ubicacion,
          cupo: evento.cupo,
          valor: evento.valor ?? 0,
          organizador: evento.organizador ?? '',
        }
      : { estado: 'proximo' },
  })

  const onSubmit = (data: FormData) => {
    if (isEdit && evento) update({ id: evento.id, data }, { onSuccess: () => { onClose(); reset() } })
    else create(data as EventoFormData, { onSuccess: () => { onClose(); reset() } })
  }

  const estadoOpts = Object.entries(estadoBadge).map(([value, { label }]) => ({ value, label }))

  return (
    <Modal
      open={open} onClose={onClose}
      title={isEdit ? 'Editar evento' : 'Nuevo evento'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar' : 'Crear evento'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input {...register('nombre')} id="ev-nombre" label="Nombre del evento *" placeholder="Ej: Webinar Digital" error={errors.nombre?.message} />
        <div className="grid grid-cols-2 gap-4">
          <Select id="ev-estado" label="Estado *" options={estadoOpts} value={watch('estado')} onChange={v => setValue('estado', v as EstadoEvento)} />
          <Input {...register('cupo')} id="ev-cupo" label="Cupo máximo *" type="number" placeholder="0" error={errors.cupo?.message} leftIcon={<Users size={13} />} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('fecha')} id="ev-fecha" label="Fecha *" type="date" error={errors.fecha?.message} />
          <Input {...register('hora')} id="ev-hora" label="Hora *" type="time" error={errors.hora?.message} leftIcon={<Clock size={13} />} />
        </div>
        <Input {...register('ubicacion')} id="ev-ubicacion" label="Ubicación *" placeholder="Ej: Sala A / Online" error={errors.ubicacion?.message} leftIcon={<MapPin size={13} />} />
        <Input {...register('valor')} id="ev-valor" label="Valor (COP)" type="number" placeholder="Dejar en blanco si es gratis" />
        <textarea {...register('descripcion')} id="ev-desc" rows={2} placeholder="Descripción del evento..." className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
      </div>
    </Modal>
  )
}

export default function EventosPage() {
  const { data: eventos = [], isLoading, isError, refetch } = useEventos()
  const { mutate: del, isPending: deleting } = useDeleteEvento()

  const [activeTab, setActiveTab] = useState('todos')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Evento | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Evento | undefined>()

  const filtered = eventos.filter(e => activeTab === 'todos' || e.estado === activeTab)
  const counts = TABS.reduce((acc, t) => ({ ...acc, [t.id]: t.id === 'todos' ? eventos.length : eventos.filter(e => e.estado === t.id).length }), {} as Record<string, number>)

  const proximosEventos = eventos
    .filter(e => e.estado === 'proximo')
    .map(e => ({ ...e, diasRestantes: differenceInDays(new Date(e.fecha), new Date()) }))
    .filter(e => e.diasRestantes >= 0)
    .sort((a, b) => a.diasRestantes - b.diasRestantes)

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Eventos y Charlas</h1>
          <p className="text-sm text-surface-500 mt-0.5">{eventos.length} eventos registrados</p>
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => { setEditTarget(undefined); setModalOpen(true) }}>
          Nuevo evento
        </Button>
      </div>

      {proximosEventos.length > 0 && proximosEventos[0]?.diasRestantes <= 7 && (
        <div className="bg-info/10 border border-info/30 rounded-lg p-3 flex gap-3">
          <AlertCircle size={18} className="text-info flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <p className="font-medium text-surface-100">Evento próximo en {proximosEventos[0].diasRestantes} días</p>
            <p className="text-surface-500 text-xs mt-0.5">{proximosEventos[0].nombre} • {proximosEventos[0].inscritos}/{proximosEventos[0].cupo} inscritos</p>
          </div>
        </div>
      )}

      <Tabs
        tabs={TABS.map(t => ({ ...t, count: counts[t.id] }))}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[0,1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState icon={<CalendarIcon size={28} />} title="Error al cargar" description="No se pudieron cargar los eventos" action={<Button size="sm" variant="secondary" onClick={() => refetch()}>Reintentar</Button>} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<CalendarIcon size={28} />} title="Sin eventos" description="No hay eventos en esta categoría" action={<Button size="sm" leftIcon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Crear evento</Button>} />
      ) : (
        <motion.div
          className="space-y-3"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {filtered.map((e) => {
            const badge = estadoBadge[e.estado]
            const porcentajeInscritos = Math.round((e.inscritos / e.cupo) * 100)
            const lugaresDisponibles = e.cupo - e.inscritos

            return (
              <motion.div key={e.id} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                <Card hoverable className="p-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon size={20} className="text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-surface-100 text-sm">{e.nombre}</h3>
                          {e.descripcion && <p className="text-xs text-surface-500 mt-0.5 line-clamp-1">{e.descripcion}</p>}
                        </div>
                        <Badge variant={badge.v} dot size="sm">{badge.label}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Clock size={13} className="text-surface-500" />
                          <span className="text-surface-300">{format(new Date(`${e.fecha}T${e.hora}`), 'd MMM, HH:mm', { locale: es })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin size={13} className="text-surface-500" />
                          <span className="text-surface-300 truncate">{e.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Users size={13} className="text-surface-500" />
                          <span className="text-surface-300">{e.inscritos}/{e.cupo}</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-800 rounded-full h-1.5 mt-2">
                        <div className="bg-brand-500 h-full rounded-full transition-all" style={{ width: `${porcentajeInscritos}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                    <div className="flex-1 text-xs">
                      {e.valor ? (
                        <p className="font-display font-semibold text-surface-100">{formatCOP(e.valor)}</p>
                      ) : (
                        <p className="text-surface-500">Gratuito</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs" iconOnly onClick={() => { setEditTarget(e); setModalOpen(true) }}>
                        <Pencil size={12} />
                      </Button>
                      <Button variant="ghost" size="xs" iconOnly onClick={() => setDeleteTarget(e)} className="hover:text-danger">
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <EventoModal open={modalOpen} onClose={() => setModalOpen(false)} evento={editTarget} />
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(undefined)}
        onConfirm={() => { if (deleteTarget) del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) }) }}
        title="¿Eliminar evento?"
        message={`Se eliminará "${deleteTarget?.nombre}" permanentemente.`}
        confirmLabel="Eliminar"
        isLoading={deleting}
      />
    </div>
  )
}
