export type EstadoServicio = 'pendiente' | 'en_progreso' | 'completado' | 'cancelado'

export interface Servicio {
  id:          number
  nombre:      string
  descripcion?: string
  clienteId:   number
  clienteNombre?: string
  estado:      EstadoServicio
  precio:      number
  fechaInicio: string
  fechaFin?:   string
  notas?:      string
  createdAt:   string
  updatedAt:   string
}

export interface ServicioFormData {
  nombre:      string
  descripcion?: string
  clienteId:   number
  estado:      EstadoServicio
  precio:      number
  fechaInicio: string
  fechaFin?:   string
  notas?:      string
}
