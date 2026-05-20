export type Etapa = 'contacto' | 'propuesta' | 'negociacion' | 'cierre' | 'ganada' | 'perdida'
export type Prioridad = 'baja' | 'media' | 'alta'

export interface Oportunidad {
  id: number
  titulo: string
  descripcion?: string
  clienteId: number
  responsableId?: number
  etapa: Etapa
  valor: number
  probabilidad: number
  fechaEstimada?: string | Date
  notas?: string
  prioridad: Prioridad
  createdAt: string
  updatedAt: string
  cliente?: {
    id: number
    nombre: string
    email: string
  }
  responsable?: {
    id: number
    nombre: string
    email: string
  }
}

export interface CreateOportunidadRequest {
  titulo: string
  descripcion?: string
  clienteId: number
  etapa?: Etapa
  valor: number
  probabilidad?: number
  fechaEstimada?: string | Date
  notas?: string
  prioridad?: Prioridad
}

export interface UpdateOportunidadRequest extends Partial<CreateOportunidadRequest> {}

export interface CambiarEtapaRequest {
  etapa: Etapa
}

export interface OportunidadFormData extends CreateOportunidadRequest {}
