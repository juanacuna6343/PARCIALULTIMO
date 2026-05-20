export type TipoEvento = 'reunion' | 'cita' | 'tarea' | 'recordatorio' | 'otro'

export interface Evento {
  id:          number
  titulo:      string
  descripcion?: string
  tipo:        TipoEvento
  fechaInicio: string
  fechaFin?:   string
  todoElDia:   boolean
  clienteId?:  number
  clienteNombre?: string
  color?:      string
  createdAt:   string
}

export interface EventoFormData {
  titulo:      string
  descripcion?: string
  tipo:        TipoEvento
  fechaInicio: string
  fechaFin?:   string
  todoElDia:   boolean
  clienteId?:  number
}

export const TIPO_COLORES: Record<TipoEvento, string> = {
  reunion:      '#3B6FD4',
  cita:         '#10B981',
  tarea:        '#F59E0B',
  recordatorio: '#8B5CF6',
  otro:         '#64748B',
}
