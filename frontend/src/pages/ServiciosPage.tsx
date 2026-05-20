import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Briefcase, DollarSign, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Button }       from '../components/ui/Button'
import { Badge }        from '../components/ui/Badge'
import { Modal }        from '../components/ui/Modal'
import { Input }        from '../components/ui/Input'
import { Select }       from '../components/ui/Select'
import { TabsUnderline } from '../components/ui/Tabs'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { SkeletonCard } from '../components/ui/Skeleton'
import { EmptyState }   from '../components/ui/EmptyState'
import { useServicios, useCreateServicio, useUpdateServicio, useDeleteServicio } from '../features/servicios/hooks/useServicios'
import { useClientes } from '../features/clientes/hooks/useClientes'
import type { Servicio, ServicioFormData, EstadoServicio } from '../types/servicio.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const schema = z.object({
  nombre:      z.string().min(2, 'Nombre requerido'),
  descripcion: z.string().optional(),
  clienteId:   z.coerce.number().min(1, 'Selecciona un cliente'),
  estado:      z.enum(['pendiente', 'en_progreso', 'completado', 'cancelado']),
  precio:      z.coerce.number().min(0, 'Precio inválido'),
  fechaInicio: z.string().min(1, 'Fecha requerida'),
  fechaFin:    z.string().optional(),
  notas:       z.string().optional(),
}).refine((data) => {
  if (data.fechaFin && data.fechaInicio) {
    return new Date(data.fechaFin) >= new Date(data.fechaInicio)
  }
  return true
}, { message: 'Fecha fin debe ser mayor o igual a fecha inicio', path: ['fechaFin'] })
type FormData = z.infer<typeof schema>

const estadoBadge: Record<EstadoServicio, { v: 'warning' | 'info' | 'success' | 'danger'; label: string }> = {
  pendiente:   { v: 'warning', label: 'Pendiente'   },
  en_progreso: { v: 'info',    label: 'En progreso'  },
  completado:  { v: 'success', label: 'Completado'   },
  cancelado:   { v: 'danger',  label: 'Cancelado'    },
}

const TABS = [
  { id: 'todos',       label: 'Todos'        },
  { id: 'pendiente',   label: 'Pendientes'   },
  { id: 'en_progreso', label: 'En progreso'  },
  { id: 'completado',  label: 'Completados'  },
  { id: 'cancelado',   label: 'Cancelados'   },
]

const estadoOpts = Object.entries(estadoBadge).map(([value, { label }]) => ({ value, label }))
const formatCOP  = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)

interface ServicioModalProps { open: boolean; onClose: () => void; servicio?: Servicio }
const ServicioModal = ({ open, onClose, servicio }: ServicioModalProps) => {
  const isEdit = !!servicio
  const { mutate: create, isPending: creating } = useCreateServicio()
  const { mutate: update, isPending: updating } = useUpdateServicio()
  const { data: clientes = [] } = useClientes()
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: servicio
      ? { nombre: servicio.nombre, descripcion: servicio.descripcion ?? '', clienteId: servicio.clienteId, estado: servicio.estado, precio: servicio.precio, fechaInicio: servicio.fechaInicio ? servicio.fechaInicio.split('T')[0] : '', fechaFin: servicio.fechaFin ? servicio.fechaFin.split('T')[0] : '', notas: servicio.notas ?? '' }
      : { estado: 'pendiente', precio: 0 },
  })

  const onSubmit = (data: FormData) => {
    if (isEdit && servicio) update({ id: servicio.id, data }, { onSuccess: () => { onClose(); reset() } })
    else create(data as ServicioFormData, { onSuccess: () => { onClose(); reset() } })
  }

  const clienteOptions = clientes.map(c => ({ value: c.id.toString(), label: c.nombre }))

  return (
    <Modal
      open={open} onClose={onClose}
      title={isEdit ? 'Editar servicio' : 'Nuevo servicio'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar' : 'Crear servicio'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input {...register('nombre')} id="s-nombre" label="Nombre del servicio *" placeholder="Ej: Desarrollo Web" error={errors.nombre?.message} />
        <Select 
          id="s-cliente" 
          label="Cliente *" 
          options={clienteOptions} 
          value={watch('clienteId')?.toString() || ''} 
          onChange={v => setValue('clienteId', parseInt(v))}
          error={errors.clienteId?.message}
          placeholder="Selecciona un cliente"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select id="s-estado" label="Estado *" options={estadoOpts} value={watch('estado')} onChange={v => setValue('estado', v as EstadoServicio)} />
          <Input {...register('precio')} id="s-precio" label="Precio (COP) *" type="number" placeholder="0" error={errors.precio?.message} leftIcon={<DollarSign size={13} />} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('fechaInicio')} id="s-fi" label="Fecha inicio *" type="date" error={errors.fechaInicio?.message} />
          <Input {...register('fechaFin')} id="s-ff" label="Fecha fin" type="date" error={errors.fechaFin?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-desc" className="text-xs font-medium text-surface-300">Descripción</label>
          <textarea {...register('descripcion')} id="s-desc" rows={3} placeholder="Descripción del servicio..." className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
        </div>
      </div>
    </Modal>
  )
}

export default function ServiciosPage() {
  const { data: servicios = [], isLoading, isError, refetch } = useServicios()
  const { mutate: del, isPending: deleting } = useDeleteServicio()

  const [activeTab,    setActiveTab]    = useState('todos')
  const [modalOpen,    setModalOpen]    = useState(false)
  const [editTarget,   setEditTarget]   = useState<Servicio | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Servicio | undefined>()

  const filtered = servicios.filter(s => activeTab === 'todos' || s.estado === activeTab)
  const counts   = TABS.reduce((acc, t) => ({ ...acc, [t.id]: t.id === 'todos' ? servicios.length : servicios.filter(s => s.estado === t.id).length }), {} as Record<string, number>)

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Servicios</h1>
          <p className="text-sm text-surface-500 mt-0.5">{servicios.length} servicios registrados</p>
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => { setEditTarget(undefined); setModalOpen(true) }}>
          Nuevo servicio
        </Button>
      </div>

      <TabsUnderline
        tabs={TABS.map(t => ({ ...t, count: counts[t.id] }))}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState icon={<Briefcase size={28} />} title="Error al cargar" description="No se pudo conectar con el servidor" action={<Button size="sm" variant="secondary" onClick={() => refetch()}>Reintentar</Button>} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Briefcase size={28} />} title="Sin servicios" description="No hay servicios en esta categoría" action={<Button size="sm" leftIcon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Crear servicio</Button>} />
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {filtered.map((s) => {
            const badge = estadoBadge[s.estado]
            return (
              <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <Card hoverable className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                      <Briefcase size={18} className="text-brand-400" />
                    </div>
                    <Badge variant={badge.v} dot size="sm">{badge.label}</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-surface-100 text-sm mb-1">{s.nombre}</h3>
                  {s.descripcion && <p className="text-xs text-surface-400 mb-3 line-clamp-2">{s.descripcion}</p>}
                  <div className="mt-auto space-y-2">
                    {s.clienteNombre && (
                      <div className="flex items-center gap-1.5 text-xs text-surface-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
                        {s.clienteNombre}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-surface-500">
                      <Calendar size={11} />
                      {format(new Date(s.fechaInicio), "d MMM yyyy", { locale: es })}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="font-display font-bold text-base text-surface-100">{formatCOP(s.precio)}</span>
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

      <ServicioModal open={modalOpen} onClose={() => { setModalOpen(false); setEditTarget(undefined) }} servicio={editTarget} />
      {deleteTarget && (
        <ConfirmModal
          open={!!deleteTarget}
          title="Eliminar servicio"
          message={`¿Eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          isLoading={deleting}
          onConfirm={() => {
            del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) })
          }}
          onCancel={() => setDeleteTarget(undefined)}
          variant="danger"
        />
      )}
    </div>
  )
}
