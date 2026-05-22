import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../../lib/api'
import type { Suscripcion, SuscripcionFormData } from '../../../types/suscripcion.types'
import type { ApiResponse } from '../../../types/api.types'

const MOCK_SUSCRIPCIONES: Suscripcion[] = [
  { id: 1, clienteId: 1, clienteNombre: 'María García', nombre: 'Plan Premium', descripcion: 'Acceso completo a herramientas', estado: 'activa', valor: 500000, frecuencia: 'mensual', fechaInicio: '2024-01-15T00:00:00Z', fechaRenovacion: '2024-06-15T00:00:00Z', proximoPago: '2024-06-15T00:00:00Z', createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z' },
  { id: 2, clienteId: 2, clienteNombre: 'Carlos Rodríguez', nombre: 'Plan Profesional', descripcion: 'Incluye soporte prioritario', estado: 'activa', valor: 800000, frecuencia: 'trimestral', fechaInicio: '2024-02-01T00:00:00Z', fechaRenovacion: '2024-05-01T00:00:00Z', proximoPago: '2024-05-01T00:00:00Z', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
  { id: 3, clienteId: 3, clienteNombre: 'Ana Martínez', nombre: 'Plan Starter', descripcion: 'Para pequeños equipos', estado: 'activa', valor: 250000, frecuencia: 'mensual', fechaInicio: '2024-03-01T00:00:00Z', fechaRenovacion: '2024-06-01T00:00:00Z', proximoPago: '2024-06-01T00:00:00Z', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
]

const fetchSuscripciones = async (): Promise<Suscripcion[]> => {
  try {
    const { data } = await api.get<ApiResponse<Suscripcion[]>>('/suscripciones')
    return data.success ? data.data : MOCK_SUSCRIPCIONES
  } catch { return MOCK_SUSCRIPCIONES }
}

export const useSuscripciones = () =>
  useQuery({
    queryKey: ['suscripciones'],
    queryFn: fetchSuscripciones,
  })

export const useCreateSuscripcion = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: SuscripcionFormData) => {
      console.log('createSuscripcion payload', data)
      return api.post<ApiResponse<Suscripcion>>('/suscripciones', data).then(r => r.data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suscripciones'] })
      toast.success('Suscripción creada correctamente')
    },
    onError: (error: any) => {
      console.error('Error creando suscripción:', error?.response?.data || error)
      const message = error?.response?.data?.message || error?.response?.data?.error?.message || 'Error al crear la suscripción'
      toast.error(message)
    },
  })
}

export const useUpdateSuscripcion = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SuscripcionFormData> }) =>
      api.put<ApiResponse<Suscripcion>>(`/suscripciones/${id}`, data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suscripciones'] })
      toast.success('Suscripción actualizada correctamente')
    },
    onError: () => toast.error('Error al actualizar'),
  })
}

export const useDeleteSuscripcion = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/suscripciones/${id}`).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suscripciones'] })
      toast.success('Suscripción eliminada')
    },
    onError: () => toast.error('Error al eliminar'),
  })
}
