import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, TrendingUp, ArrowRight, Eye, MoreVertical } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { EmptyState } from '../components/ui/EmptyState'
import { useOportunidades, useCreateOportunidad, useUpdateOportunidad, useDeleteOportunidad } from '../features/pipeline/hooks/useOportunidades'
import { useClientes } from '../features/clientes/hooks/useClientes'
import type { Oportunidad, OportunidadFormData, EtapaPipeline, ProbabilidadCierre } from '../types/oportunidad.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const schema = z.object({
  titulo:        z.string().min(3, 'Título requerido'),
  clienteId:     z.coerce.number().min(1, 'Selecciona un cliente'),
  etapa:         z.enum(['contacto', 'propuesta', 'negociacion', 'cierre']),
  valor:         z.coerce.number().min(0, 'Valor requerido'),
  probabilidad:  z.coerce.number().min(0, 'Probabilidad requerida').max(100, 'Debe ser entre 0 y 100'),
  fechaEstimada: z.string().min(1, 'Fecha requerida'),
  descripcion:   z.string().optional(),
  notas:         z.string().optional(),
})
type FormData = z.infer<typeof schema>

const etapaInfo: Record<EtapaPipeline, { label: string; color: string; icon: string }> = {
  contacto: { label: 'Contacto', color: 'bg-surface-800 border-surface-700', icon: '📞' },
  propuesta: { label: 'Propuesta', color: 'bg-info/10 border-info/30', icon: '📋' },
  negociacion: { label: 'Negociación', color: 'bg-warning/10 border-warning/30', icon: '🤝' },
  cierre: { label: 'Cierre', color: 'bg-success/10 border-success/30', icon: '✅' },
}

const getEtiquetaProbabilidad = (value: number) =>
  value >= 80 ? 'Muy alta' : value >= 60 ? 'Alta' : value >= 40 ? 'Media' : 'Baja'

const getVariantProbabilidad = (value: number) =>
  value >= 80 ? 'success' : value >= 60 ? 'info' : value >= 40 ? 'warning' : 'danger'

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)

interface OportunidadModalProps { open: boolean; onClose: () => void; oportunidad?: Oportunidad }
const OportunidadModal = ({ open, onClose, oportunidad }: OportunidadModalProps) => {
  const isEdit = !!oportunidad
  const { mutate: create, isPending: creating } = useCreateOportunidad()
  const { mutate: update, isPending: updating } = useUpdateOportunidad()
  const { data: clientes = [] } = useClientes()

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: oportunidad
      ? {
          titulo: oportunidad.titulo,
          clienteId: oportunidad.clienteId,
          etapa: oportunidad.etapa,
          valor: oportunidad.valor,
          probabilidad: oportunidad.probabilidad,
          fechaEstimada: oportunidad.fechaEstimada ? String(oportunidad.fechaEstimada).split('T')[0] : '',
          descripcion: oportunidad.descripcion ?? '',
          notas: oportunidad.notas ?? '',
        }
      : { etapa: 'contacto', probabilidad: 50 },
  })

  const onSubmit = (data: FormData) => {
    if (isEdit && oportunidad) update({ id: oportunidad.id, data }, { onSuccess: () => { onClose(); reset() } })
    else create(data as OportunidadFormData, { onSuccess: () => { onClose(); reset() } })
  }

  const clienteOptions = clientes.map(c => ({ value: c.id.toString(), label: c.nombre }))
  const etapaOpts = Object.entries(etapaInfo).map(([value, { label }]) => ({ value, label }))
  const probOpts = [
    { value: '25', label: 'Baja' },
    { value: '30', label: 'Baja' },
    { value: '50', label: 'Media' },
    { value: '60', label: 'Media' },
    { value: '75', label: 'Alta' },
    { value: '90', label: 'Muy alta' },
  ]

  return (
    <Modal
      open={open} onClose={onClose}
      title={isEdit ? 'Editar oportunidad' : 'Nueva oportunidad'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar' : 'Crear'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input {...register('titulo')} id="opp-titulo" label="Título de la oportunidad *" placeholder="Ej: Desarrollo Web ABC Corp" error={errors.titulo?.message} />
        <Select 
          id="opp-cliente" 
          label="Cliente *" 
          options={clienteOptions} 
          value={String(watch('clienteId') ?? '')} 
          onChange={v => setValue('clienteId', parseInt(v))}
          error={errors.clienteId?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('valor')} id="opp-valor" label="Valor (COP) *" type="number" placeholder="0" error={errors.valor?.message} />
          <Input {...register('fechaEstimada')} id="opp-fecha" label="Fecha estimada *" type="date" error={errors.fechaEstimada?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select id="opp-etapa" label="Etapa *" options={etapaOpts} value={watch('etapa')} onChange={v => setValue('etapa', v as EtapaPipeline)} />
          <Select id="opp-prob" label="Probabilidad *" options={probOpts} value={watch('probabilidad')?.toString() || ''} onChange={v => setValue('probabilidad', parseInt(v) as ProbabilidadCierre)} />
        </div>
        <textarea {...register('descripcion')} id="opp-desc" rows={2} placeholder="Descripción de la oportunidad..." className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
      </div>
    </Modal>
  )
}

const OportunidadCard = ({ opp, onEdit, onDelete }: { opp: Oportunidad; onEdit: () => void; onDelete: () => void }) => {
  const clienteNombre = opp.cliente?.nombre ?? (opp as any).clienteNombre ?? 'Cliente no asignado'
  const probabilidad = typeof opp.probabilidad === 'string' ? parseInt(opp.probabilidad, 10) : opp.probabilidad
  const fechaEstimada = opp.fechaEstimada ? new Date(opp.fechaEstimada) : undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card hoverable className="p-3 cursor-move hover:shadow-lg">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-surface-100 text-sm line-clamp-2">{opp.titulo}</h4>
            <p className="text-xs text-surface-500 mt-0.5">{clienteNombre}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button variant="ghost" size="xs" iconOnly onClick={onEdit}>
              <Pencil size={12} />
            </Button>
            <Button variant="ghost" size="xs" iconOnly onClick={onDelete} className="hover:text-danger">
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
        <div className="space-y-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-surface-100">{formatCOP(opp.valor)}</span>
            <Badge variant={getVariantProbabilidad(probabilidad)} dot size="sm">{getEtiquetaProbabilidad(probabilidad)}</Badge>
          </div>
          <div className="text-xs text-surface-500">
            {fechaEstimada ? format(fechaEstimada, 'd MMM', { locale: es }) : 'Sin fecha'}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function PipelinePage() {
  const { data: oportunidades = [], isLoading } = useOportunidades()
  const { mutate: del, isPending: deleting } = useDeleteOportunidad()

  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Oportunidad | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Oportunidad | undefined>()

  const etapas: EtapaPipeline[] = ['contacto', 'propuesta', 'negociacion', 'cierre']
  const oportunidadesPorEtapa = etapas.reduce((acc, etapa) => ({
    ...acc,
    [etapa]: oportunidades.filter(o => o.etapa === etapa),
  }), {} as Record<EtapaPipeline, Oportunidad[]>)

  const valorTotalPorEtapa = etapas.reduce((acc, etapa) => ({
    ...acc,
    [etapa]: oportunidades
      .filter(o => o.etapa === etapa)
      .reduce((sum, o) => sum + (o.valor * (o.probabilidad / 100)), 0),
  }), {} as Record<EtapaPipeline, number>)

  const valorTotal = oportunidades.reduce((sum, o) => sum + o.valor, 0)

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Pipeline de Ventas</h1>
          <p className="text-sm text-surface-500 mt-0.5">Valor total: {formatCOP(valorTotal)}</p>
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => { setEditTarget(undefined); setModalOpen(true) }}>
          Nueva oportunidad
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-20 bg-surface-800 rounded-lg animate-pulse" />
              <div className="h-20 bg-surface-800 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      ) : oportunidades.length === 0 ? (
        <EmptyState icon={<TrendingUp size={28} />} title="Sin oportunidades" description="Crea tu primera oportunidad comercial" action={<Button size="sm" leftIcon={<Plus size={13} />} onClick={() => setModalOpen(true)}>Nueva oportunidad</Button>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {etapas.map((etapa) => {
            const info = etapaInfo[etapa]
            const opps = oportunidadesPorEtapa[etapa]
            const valor = valorTotalPorEtapa[etapa]

            return (
              <motion.div key={etapa} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Object.keys(etapaInfo).indexOf(etapa) * 0.1 }}>
                <div className={`rounded-xl border-2 p-4 min-h-[600px] flex flex-col ${info.color}`}>
                  <div className="mb-4">
                    <h3 className="font-display font-semibold text-surface-100 flex items-center gap-2">
                      <span>{info.icon}</span>
                      {info.label}
                    </h3>
                    <p className="text-xs text-surface-500 mt-1">{opps.length} oportunidades</p>
                    <p className="text-sm font-display font-bold text-surface-100 mt-2">{formatCOP(valor)}</p>
                  </div>

                  <div className="flex-1 space-y-2 min-h-[400px]">
                    {opps.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-surface-600 text-sm">
                        Sin oportunidades
                      </div>
                    ) : (
                      opps.map(opp => (
                        <OportunidadCard
                          key={opp.id}
                          opp={opp}
                          onEdit={() => { setEditTarget(opp); setModalOpen(true) }}
                          onDelete={() => setDeleteTarget(opp)}
                        />
                      ))
                    )}
                  </div>

                  {etapa !== 'cierre' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      rightIcon={<ArrowRight size={12} />}
                      className="mt-4"
                      disabled={opps.length === 0}
                    >
                      Mover
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      <OportunidadModal open={modalOpen} onClose={() => setModalOpen(false)} oportunidad={editTarget} />
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(undefined)}
        onConfirm={() => { if (deleteTarget) del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) }) }}
        title="¿Eliminar oportunidad?"
        message={`Se eliminará "${deleteTarget?.titulo}" del pipeline.`}
        confirmLabel="Eliminar"
        isLoading={deleting}
      />
    </div>
  )
}
