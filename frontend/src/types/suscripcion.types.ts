export type EstadoSuscripcion = 'activa' | 'vencida' | 'pausada' | 'cancelada'
export type FrecuenciaBillingType = 'mensual' | 'trimestral' | 'semestral' | 'anual'
export type EstadoPago = 'pendiente' | 'pagado' | 'atrasado'

export interface Suscripcion {
  id: number
  clienteId: number
  nombre: string
  descripcion?: string
  estado: EstadoSuscripcion
  pago: EstadoPago
  valor: number
  frecuencia: FrecuenciaBillingType
  fechaInicio: string | Date
  fechaRenovacion: string | Date
  notas?: string
  createdAt: string
  updatedAt: string
  cliente?: {
    id: number
    nombre: string
    email: string
  }
}

export interface CreateSuscripcionRequest {
  clienteId: number
  nombre: string
  descripcion?: string
  estado?: EstadoSuscripcion
  pago?: EstadoPago
  valor: number
  frecuencia: FrecuenciaBillingType
  fechaInicio: string | Date
  fechaRenovacion: string | Date
}

export interface SuscripcionFormData extends CreateSuscripcionRequest {}
  notas?:      string
}
