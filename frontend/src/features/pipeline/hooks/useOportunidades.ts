import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../../lib/api'
import type { Oportunidad, OportunidadFormData } from '../../../types/oportunidad.types'
import type { ApiResponse } from '../../../types/api.types'

const MOCK_OPORTUNIDADES: Oportunidad[] = [
  { id: 1, titulo: 'Desarrollo Web Consultora XYZ', clienteId: 1, cliente: { id: 1, nombre: 'María García', email: 'maria@acme.com' }, responsableId: 1, responsable: { id: 1, nombre: 'Admin Principal', email: 'admin@sgdi.local' }, etapa: 'contacto', valor: 12000000, probabilidad: 60, fechaEstimada: '2024-06-30T00:00:00Z', descripcion: 'Desarrollo de plataforma e-learning', prioridad: 'alta', createdAt: '2024-05-15T00:00:00Z', updatedAt: '2024-05-15T00:00:00Z' },
  { id: 2, titulo: 'Auditoría Tecnológica Tech Corp', clienteId: 2, cliente: { id: 2, nombre: 'Carlos Rodríguez', email: 'carlos@megastore.com' }, responsableId: 2, responsable: { id: 2, nombre: 'Laura Supervisora', email: 'supervisor@sgdi.local' }, etapa: 'propuesta', valor: 8500000, probabilidad: 80, fechaEstimada: '2024-06-15T00:00:00Z', descripcion: 'Auditoría de infraestructura TI', prioridad: 'media', createdAt: '2024-05-10T00:00:00Z', updatedAt: '2024-05-16T00:00:00Z' },
  { id: 3, titulo: 'Consultoría Estratégica Digital', clienteId: 3, cliente: { id: 3, nombre: 'Ana Martínez', email: 'ana@innovatech.com' }, responsableId: 2, responsable: { id: 2, nombre: 'Laura Supervisora', email: 'supervisor@sgdi.local' }, etapa: 'negociacion', valor: 15000000, probabilidad: 75, fechaEstimada: '2024-06-01T00:00:00Z', descripcion: 'Plan de transformación digital', prioridad: 'media', createdAt: '2024-04-30T00:00:00Z', updatedAt: '2024-05-14T00:00:00Z' },
  { id: 4, titulo: 'Implementación ERP', clienteId: 5, cliente: { id: 5, nombre: 'Sofia Torres', email: 'sofia@empresa.com' }, responsableId: 1, responsable: { id: 1, nombre: 'Admin Principal', email: 'admin@sgdi.local' }, etapa: 'cierre', valor: 25000000, probabilidad: 95, fechaEstimada: '2024-05-25T00:00:00Z', descripcion: 'Implementación de ERP SAP', prioridad: 'alta', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-05-17T00:00:00Z' },
  { id: 5, titulo: 'Capacitación Agile', clienteId: 6, cliente: { id: 6, nombre: 'Andrés López', email: 'andres@consultoria.com' }, responsableId: 2, responsable: { id: 2, nombre: 'Laura Supervisora', email: 'supervisor@sgdi.local' }, etapa: 'propuesta', valor: 6000000, probabilidad: 50, fechaEstimada: '2024-07-15T00:00:00Z', descripcion: 'Programa de capacitación en metodología Agile', prioridad: 'media', createdAt: '2024-05-12T00:00:00Z', updatedAt: '2024-05-16T00:00:00Z' },
  { id: 6, titulo: 'Migración Cloud', clienteId: 1, cliente: { id: 1, nombre: 'María García', email: 'maria@acme.com' }, responsableId: 2, responsable: { id: 2, nombre: 'Laura Supervisora', email: 'supervisor@sgdi.local' }, etapa: 'contacto', valor: 18000000, probabilidad: 30, fechaEstimada: '2024-08-01T00:00:00Z', descripcion: 'Migración de infraestructura a AWS', prioridad: 'media', createdAt: '2024-05-17T00:00:00Z', updatedAt: '2024-05-17T00:00:00Z' },
]

const fetchOportunidades = async (): Promise<Oportunidad[]> => {
  try {
    const response = await api.get<ApiResponse<Oportunidad[]>>('/pipeline')
    const payload = response.data

    if (payload?.success && Array.isArray(payload.data)) {
      return payload.data
    }

    if (Array.isArray(payload?.data)) {
      return payload.data
    }

    return MOCK_OPORTUNIDADES
  } catch (error) {
    console.error('Error fetching oportunidades:', error)
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
