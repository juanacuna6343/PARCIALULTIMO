import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../../lib/api'
import type { Oportunidad, OportunidadFormData } from '../../../types/oportunidad.types'
import type { ApiResponse } from '../../../types/api.types'

const MOCK_OPORTUNIDADES: Oportunidad[] = [
  { id: 1, titulo: 'Desarrollo Web Consultora XYZ', clienteId: 1, clienteNombre: 'María García', etapa: 'contacto', valor: 12000000, probabilidad: 'media', fechaEstimada: '2024-06-30T00:00:00Z', descripcion: 'Desarrollo de plataforma e-learning', asignadoA: 'Admin Principal', createdAt: '2024-05-15T00:00:00Z', updatedAt: '2024-05-15T00:00:00Z' },
  { id: 2, titulo: 'Auditoría Tecnológica Tech Corp', clienteId: 2, clienteNombre: 'Carlos Rodríguez', etapa: 'propuesta', valor: 8500000, probabilidad: 'alta', fechaEstimada: '2024-06-15T00:00:00Z', descripcion: 'Auditoría de infraestructura TI', asignadoA: 'Laura Supervisora', createdAt: '2024-05-10T00:00:00Z', updatedAt: '2024-05-16T00:00:00Z' },
  { id: 3, titulo: 'Consultoría Estratégica Digital', clienteId: 3, clienteNombre: 'Ana Martínez', etapa: 'negociacion', valor: 15000000, probabilidad: 'alta', fechaEstimada: '2024-06-01T00:00:00Z', descripcion: 'Plan de transformación digital', asignadoA: 'Laura Supervisora', createdAt: '2024-04-30T00:00:00Z', updatedAt: '2024-05-14T00:00:00Z' },
  { id: 4, titulo: 'Implementación ERP', clienteId: 5, clienteNombre: 'Sofia Torres', etapa: 'cierre', valor: 25000000, probabilidad: 'muy_alta', fechaEstimada: '2024-05-25T00:00:00Z', descripcion: 'Implementación de ERP SAP', asignadoA: 'Admin Principal', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-05-17T00:00:00Z' },
  { id: 5, titulo: 'Capacitación Agile', clienteId: 6, clienteNombre: 'Andrés López', etapa: 'propuesta', valor: 6000000, probabilidad: 'media', fechaEstimada: '2024-07-15T00:00:00Z', descripcion: 'Programa de capacitación en metodología Agile', asignadoA: 'Pedro Operador', createdAt: '2024-05-12T00:00:00Z', updatedAt: '2024-05-16T00:00:00Z' },
  { id: 6, titulo: 'Migración Cloud', clienteId: 1, clienteNombre: 'María García', etapa: 'contacto', valor: 18000000, probabilidad: 'baja', fechaEstimada: '2024-08-01T00:00:00Z', descripcion: 'Migración de infraestructura a AWS', asignadoA: 'Pedro Operador', createdAt: '2024-05-17T00:00:00Z', updatedAt: '2024-05-17T00:00:00Z' },
]

const fetchOportunidades = async (): Promise<Oportunidad[]> => {
  try {
    const { data } = await api.get<ApiResponse<Oportunidad[]>>('/pipeline')
    return data.success ? data.data : MOCK_OPORTUNIDADES
  } catch {
    return MOCK_OPORTUNIDADES
  }
}

export const useOportunidades = () =>
  useQuery({
    queryKey: ['oportunidades'],
    queryFn: fetchOportunidades,
  })

export const useCreateOportunidad = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: OportunidadFormData) => 
      api.post<ApiResponse<Oportunidad>>('/pipeline', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['oportunidades'] })
      toast.success('Oportunidad creada correctamente')
    },
    onError: () => toast.error('Error al crear la oportunidad'),
  })
}

export const useUpdateOportunidad = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<OportunidadFormData> }) =>
      api.put<ApiResponse<Oportunidad>>(`/pipeline/${id}`, data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['oportunidades'] })
      toast.success('Oportunidad actualizada correctamente')
    },
    onError: () => toast.error('Error al actualizar'),
  })
}

export const useDeleteOportunidad = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/pipeline/${id}`).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['oportunidades'] })
      toast.success('Oportunidad eliminada')
    },
    onError: () => toast.error('Error al eliminar'),
  })
}
