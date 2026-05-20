import api from '../../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiResponse } from '../../../types/api.types'
import type { Servicio, ServicioFormData } from '../../../types/servicio.types'
import { toast } from 'sonner'

const MOCK_SERVICIOS: Servicio[] = [
  { id: 1, nombre: 'Desarrollo Web App', descripcion: 'Aplicación web personalizada', clienteId: 1, clienteNombre: 'María García', estado: 'en_progreso', precio: 5800000, fechaInicio: '2024-03-01T00:00:00Z', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
  { id: 2, nombre: 'Consultoría TI', descripcion: 'Auditoría y consultoría tecnológica', clienteId: 2, clienteNombre: 'Carlos Rodríguez', estado: 'completado', precio: 2500000, fechaInicio: '2024-02-01T00:00:00Z', fechaFin: '2024-03-01T00:00:00Z', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
  { id: 3, nombre: 'Diseño de Marca', descripcion: 'Identidad visual completa', clienteId: 3, clienteNombre: 'Ana Martínez', estado: 'pendiente', precio: 1800000, fechaInicio: '2024-04-01T00:00:00Z', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z' },
  { id: 4, nombre: 'Soporte Mensual', descripcion: 'Plan de soporte técnico', clienteId: 5, clienteNombre: 'Sofia Torres', estado: 'en_progreso', precio: 800000, fechaInicio: '2024-01-01T00:00:00Z', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 5, nombre: 'E-commerce', descripcion: 'Tienda online con pagos', clienteId: 6, clienteNombre: 'Andrés López', estado: 'pendiente', precio: 7200000, fechaInicio: '2024-05-01T00:00:00Z', createdAt: '2024-05-01T00:00:00Z', updatedAt: '2024-05-01T00:00:00Z' },
]

const fetchServicios = async (): Promise<Servicio[]> => {
  try {
    const { data } = await api.get<ApiResponse<Servicio[]>>('/servicios')
    return data.success ? data.data : MOCK_SERVICIOS
  } catch { return MOCK_SERVICIOS }
}

export const useServicios = () =>
  useQuery({ queryKey: ['servicios'], queryFn: fetchServicios })

export const useCreateServicio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (d: ServicioFormData) => api.post('/servicios', d).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }); toast.success('Servicio creado') },
    onError: () => toast.error('Error al crear el servicio'),
  })
}

export const useUpdateServicio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServicioFormData> }) =>
      api.put(`/servicios/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }); toast.success('Servicio actualizado') },
    onError: () => toast.error('Error al actualizar'),
  })
}

export const useDeleteServicio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/servicios/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }); toast.success('Servicio eliminado') },
    onError: () => toast.error('Error al eliminar'),
  })
}
