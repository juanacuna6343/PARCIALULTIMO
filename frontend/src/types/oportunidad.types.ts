export type EtapaPipeline = 'contacto' | 'propuesta' | 'negociacion' | 'cierre' | 'ganada' | 'perdida'
export type Prioridad = 'baja' | 'media' | 'alta'
export type ProbabilidadCierre = 25 | 50 | 75 | 90

export interface Oportunidad {
  id: number
  titulo: string
  descripcion?: string
  clienteId: number
  responsableId?: number
  etapa: EtapaPipeline
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
  clienteNombre?: string
  responsableNombre?: string
}

export interface CreateOportunidadRequest {
  titulo: string
  descripcion?: string
  clienteId: number
  etapa?: EtapaPipeline
  valor: number
  probabilidad?: number
  fechaEstimada?: string | Date
  notas?: string
  prioridad?: Prioridad
}

export interface UpdateOportunidadRequest extends Partial<CreateOportunidadRequest> {}

export interface CambiarEtapaRequest {
  etapa: EtapaPipeline
}

export interface OportunidadFormData extends CreateOportunidadRequest {}
