import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin   from '@fullcalendar/daygrid'
import timeGridPlugin  from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventClickArg, EventDropArg } from '@fullcalendar/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, CalendarDays, X, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card }       from '../components/ui/Card'
import { Button }     from '../components/ui/Button'
import { Modal }      from '../components/ui/Modal'
import { Input }      from '../components/ui/Input'
import { Select }     from '../components/ui/Select'
import { Badge }      from '../components/ui/Badge'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { useEventos, useCreateEvento, useDeleteEvento } from '../features/calendario/hooks/useEventos'
import type { Evento, TipoEvento } from '../types/calendario.types'
import { TIPO_COLORES } from '../types/calendario.types'

const schema = z.object({
  titulo:      z.string().min(2, 'Mínimo 2 caracteres'),
  tipo:        z.enum(['reunion', 'cita', 'tarea', 'recordatorio', 'otro']),
  fechaInicio: z.string().min(1, 'Fecha requerida'),
  fechaFin:    z.string().optional(),
  todoElDia:   z.boolean(),
  descripcion: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const tipoOpts: { value: TipoEvento; label: string }[] = [
  { value: 'reunion',      label: '🤝 Reunión'       },
  { value: 'cita',         label: '📅 Cita'          },
  { value: 'tarea',        label: '✅ Tarea'          },
  { value: 'recordatorio', label: '🔔 Recordatorio'  },
  { value: 'otro',         label: '📌 Otro'          },
]

const tipoBadgeVariant: Record<TipoEvento, 'info' | 'success' | 'warning' | 'purple' | 'gray'> = {
  reunion: 'info', cita: 'success', tarea: 'warning', recordatorio: 'purple', otro: 'gray',
}

interface EventoDetailProps { evento: Evento; onClose: () => void; onDelete: () => void }
const EventoDetail = ({ evento, onClose, onDelete }: EventoDetailProps) => (
  <Modal open title={evento.titulo} onClose={onClose} size="sm"
    footer={
      <>
        <Button variant="danger" size="sm" onClick={onDelete} leftIcon={<X size={13} />}>Eliminar</Button>
        <Button variant="secondary" size="sm" onClick={onClose}>Cerrar</Button>
      </>
    }
  >
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant={tipoBadgeVariant[evento.tipo]} dot>
          {tipoOpts.find(t => t.value === evento.tipo)?.label ?? evento.tipo}
        </Badge>
      </div>
      <div className="flex items-start gap-2 text-sm text-surface-300">
        <CalendarDays size={14} className="text-surface-500 mt-0.5 flex-shrink-0" />
        <div>
          <p>{format(new Date(evento.fechaInicio), "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
          {!evento.todoElDia && <p className="text-surface-500 text-xs mt-0.5">{format(new Date(evento.fechaInicio), 'HH:mm')}{evento.fechaFin ? ` → ${format(new Date(evento.fechaFin), 'HH:mm')}` : ''}</p>}
        </div>
      </div>
      {evento.clienteNombre && (
        <div className="flex items-center gap-2 text-sm text-surface-300">
          <MapPin size={14} className="text-surface-500" />
          <span>{evento.clienteNombre}</span>
        </div>
      )}
      {evento.descripcion && (
        <p className="text-xs text-surface-400 bg-surface-800/60 rounded-lg px-3 py-2.5 border border-white/[0.06]">{evento.descripcion}</p>
      )}
    </div>
  </Modal>
)

export default function CalendarioPage() {
  const { data: eventos = [], isLoading } = useEventos()
  const { mutate: create, isPending: creating } = useCreateEvento()
  const { mutate: remove, isPending: removing } = useDeleteEvento()
  const calRef = useRef<InstanceType<typeof FullCalendar>>(null)

  const [createOpen, setCreateOpen] = useState(false)
  const [detailEvento, setDetailEvento] = useState<Evento | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Evento | undefined>()
  const [defaultDate,  setDefaultDate]  = useState('')

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: 'reunion', todoElDia: false },
  })

  const fcEvents = eventos.map(e => ({
    id:        String(e.id),
    title:     e.titulo,
    start:     e.fechaInicio,
    end:       e.fechaFin,
    allDay:    e.todoElDia,
    color:     TIPO_COLORES[e.tipo],
    extendedProps: e,
  }))

  const handleDateClick = (arg: DateClickArg) => {
    setDefaultDate(arg.dateStr)
    setValue('fechaInicio', arg.dateStr)
    setCreateOpen(true)
  }

  const handleEventClick = (arg: EventClickArg) => {
    const ev = arg.event.extendedProps as Evento
    setDetailEvento(ev)
  }

  const onSubmit = (data: FormData) => {
    create({ ...data, tipo: data.tipo as TipoEvento }, { onSuccess: () => { setCreateOpen(false); reset() } })
  }

  const tipo = watch('tipo') as TipoEvento

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Calendario</h1>
          <p className="text-sm text-surface-500 mt-0.5">{eventos.length} eventos programados</p>
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => setCreateOpen(true)}>
          Nuevo evento
        </Button>
      </div>

      <Card padding="sm" className="overflow-hidden">
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          events={fcEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable
          selectable
          dayMaxEvents={3}
          headerToolbar={{
            left:   'prev,next today',
            center: 'title',
            right:  'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{ today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día' }}
          height={620}
          eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false }}
          nowIndicator
        />
      </Card>

      {/* Create event modal */}
      <Modal
        open={createOpen}
        onClose={() => { setCreateOpen(false); reset() }}
        title="Nuevo evento"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => { setCreateOpen(false); reset() }}>Cancelar</Button>
            <Button size="sm" isLoading={creating} onClick={handleSubmit(onSubmit)}>Crear evento</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input {...register('titulo')} id="ev-titulo" label="Título *" placeholder="Ej: Reunión con cliente" error={errors.titulo?.message} />
          <Select
            id="ev-tipo"
            label="Tipo de evento"
            options={tipoOpts}
            value={tipo}
            onChange={v => setValue('tipo', v as TipoEvento)}
          />
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: TIPO_COLORES[tipo] }} />
            <span className="text-xs text-surface-400">Color del evento</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input {...register('fechaInicio')} id="ev-fi" label="Fecha inicio *" type={watch('todoElDia') ? 'date' : 'datetime-local'} error={errors.fechaInicio?.message} />
            <Input {...register('fechaFin')} id="ev-ff" label="Fecha fin" type={watch('todoElDia') ? 'date' : 'datetime-local'} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('todoElDia')} className="rounded border-white/20 bg-surface-800 text-brand-500 focus:ring-brand-500" />
            <span className="text-xs text-surface-300">Todo el día</span>
          </label>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ev-desc" className="text-xs font-medium text-surface-300">Descripción</label>
            <textarea {...register('descripcion')} id="ev-desc" rows={2} placeholder="Detalles del evento..." className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
          </div>
        </div>
      </Modal>

      {/* Event detail */}
      {detailEvento && (
        <Modal title="Evento" open={!!detailEvento} onClose={() => setDetailEvento(undefined)}>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-surface-500 uppercase tracking-wider font-medium">Titulo</p>
              <p className="text-surface-100 font-medium mt-1">{detailEvento.titulo}</p>
            </div>
            {detailEvento.descripcion && (
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wider font-medium">Descripción</p>
                <p className="text-surface-300 mt-1">{detailEvento.descripcion}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wider font-medium">Inicio</p>
                <p className="text-surface-100 font-medium mt-1">{format(new Date(detailEvento.fechaInicio), 'd MMM yyyy HH:mm', { locale: es })}</p>
              </div>
              {detailEvento.fechaFin && (
                <div>
                  <p className="text-xs text-surface-500 uppercase tracking-wider font-medium">Fin</p>
                  <p className="text-surface-100 font-medium mt-1">{format(new Date(detailEvento.fechaFin), 'd MMM yyyy HH:mm', { locale: es })}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-3 border-t border-white/10">
              <Button size="sm" variant="secondary" fullWidth onClick={() => setDetailEvento(undefined)}>
                Cerrar
              </Button>
              <Button size="sm" variant="ghost" className="hover:text-danger" fullWidth onClick={() => { setDetailEvento(undefined); setDeleteTarget(detailEvento) }}>
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(undefined)}
          onConfirm={() => {
            if (deleteTarget) remove(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) })
          }}
          title="¿Eliminar evento?"
          message={`Se eliminará "${deleteTarget.titulo}" del calendario.`}
          confirmLabel="Eliminar"
          isLoading={removing}
        />
      )}
    </div>
  )
}
