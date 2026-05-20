import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../../lib/api'
import type { Evento, EventoFormData } from '../../../types/evento.types'
import type { ApiResponse } from '../../../types/api.types'

const MOCK_EVENTOS: Evento[] = [
  { id: 1, nombre: 'Webinar: Transformación Digital', descripcion: 'Estrategias de digitalización para empresas', estado: 'proximo', fecha: '2024-06-15', hora: '10:00', ubicacion: 'Online', cupo: 100, inscritos: 45, valor: 0, organizador: 'SGDI', createdAt: '2024-05-01T00:00:00Z', updatedAt: '2024-05-01T00:00:00Z' },
  { id: 2, nombre: 'Charla: Liderazgo Empresarial', descripcion: 'Nuevos paradigmas de liderazgo', estado: 'proximo', fecha: '2024-06-22', hora: '14:00', ubicacion: 'Centro de Conferencias', cupo: 50, inscritos: 32, valor: 50000, organizador: 'SGDI', createdAt: '2024-05-05T00:00:00Z', updatedAt: '2024-05-05T00:00:00Z' },
  { id: 3, nombre: 'Taller: Gestión de Proyectos', descripcion: 'Metodología ágil aplicada', estado: 'proximo', fecha: '2024-07-10', hora: '09:00', ubicacion: 'Sala A', cupo: 30, inscritos: 28, valor: 150000, organizador: 'SGDI', createdAt: '2024-05-10T00:00:00Z', updatedAt: '2024-05-10T00:00:00Z' },
]

const fetchEventos = async (): Promise<Evento[]> => {
  try {
    const { data } = await api.get<ApiResponse<Evento[]>>('/eventos')
    return data.success ? data.data : MOCK_EVENTOS
  } catch {
    return MOCK_EVENTOS
  }
}

export const useEventos = () =>
  useQuery({
    queryKey: ['eventos'],
    queryFn: fetchEventos,
  })

export const useCreateEvento = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: EventoFormData) => 
      api.post<ApiResponse<Evento>>('/eventos', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['eventos'] })
      toast.success('Evento creado correctamente')
    },
    onError: () => toast.error('Error al crear el evento'),
  })
}

export const useUpdateEvento = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EventoFormData> }) =>
      api.put<ApiResponse<Evento>>(`/eventos/${id}`, data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['eventos'] })
      toast.success('Evento actualizado correctamente')
    },
    onError: () => toast.error('Error al actualizar'),
  })
}

export const useDeleteEvento = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/eventos/${id}`).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['eventos'] })
      toast.success('Evento eliminado')
    },
    onError: () => toast.error('Error al eliminar'),
  })
}
