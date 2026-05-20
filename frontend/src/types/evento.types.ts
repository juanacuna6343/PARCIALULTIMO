export type EstadoEvento = 'planificado' | 'confirmado' | 'en_curso' | 'completado' | 'cancelado'
export type TipoEvento = 'charla' | 'taller' | 'conferencia' | 'reunion' | 'otro'

export interface Inscripto {
  id: number | string
  nombre: string
  email: string
  telefono: string
  fechaInscripcion: string | Date
}

export interface Evento {
  id: number
  titulo: string
  descripcion?: string
  tipo: TipoEvento
  estado: EstadoEvento
  fechaInicio: string | Date
  fechaFin: string | Date
  ubicacion?: string
  cuposDisponibles: number
  cuposOcupados: number
  inscriptos?: Inscripto[]
  organizadorId?: number
  organizador?: {
    id: number
    nombre: string
    email: string
  }
  enlaceZoom?: string
  materialUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateEventoRequest {
  titulo: string
  descripcion?: string
  tipo?: TipoEvento
  estado?: EstadoEvento
  fechaInicio: string | Date
  fechaFin: string | Date
  ubicacion?: string
  cuposDisponibles?: number
  enlaceZoom?: string
  materialUrl?: string
}

export interface InscripcionRequest {
  nombre: string
  email: string
  telefono: string
}

export interface EventoFormData extends CreateEventoRequest {}
