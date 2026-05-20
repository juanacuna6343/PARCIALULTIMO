import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../../lib/api'
import type { Evento, EventoFormData } from '../../../types/evento.types'
import type { ApiResponse } from '../../../types/api.types'

const MOCK_EVENTOS: Evento[] = [
  { id: 1, titulo: 'Webinar: Transformación Digital', descripcion: 'Estrategias de digitalización para empresas', tipo: 'charla', estado: 'confirmado', fechaInicio: '2024-06-15T10:00:00Z', fechaFin: '2024-06-15T12:00:00Z', ubicacion: 'Online', cuposDisponibles: 100, cuposOcupados: 45, inscriptos: [
      { id: 1, nombre: 'Pedro Rodríguez', email: 'pedro@email.com', telefono: '3101234567', fechaInscripcion: '2024-05-01T00:00:00Z' }
    ],
    organizador: { id: 1, nombre: 'SGDI', email: 'contacto@sgdi.com' },
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z' },
  { id: 2, titulo: 'Charla: Liderazgo Empresarial', descripcion: 'Nuevos paradigmas de liderazgo', tipo: 'charla', estado: 'confirmado', fechaInicio: '2024-06-22T14:00:00Z', fechaFin: '2024-06-22T16:00:00Z', ubicacion: 'Centro de Conferencias', cuposDisponibles: 50, cuposOcupados: 32, inscriptos: [
      { id: 1, nombre: 'Ana García', email: 'ana@email.com', telefono: '3109876543', fechaInscripcion: '2024-05-05T00:00:00Z' }
    ],
    organizador: { id: 1, nombre: 'SGDI', email: 'contacto@sgdi.com' },
    createdAt: '2024-05-05T00:00:00Z',
    updatedAt: '2024-05-05T00:00:00Z' },
  { id: 3, titulo: 'Taller: Gestión de Proyectos', descripcion: 'Metodología ágil aplicada', tipo: 'taller', estado: 'confirmado', fechaInicio: '2024-07-10T09:00:00Z', fechaFin: '2024-07-10T12:00:00Z', ubicacion: 'Sala A', cuposDisponibles: 30, cuposOcupados: 28, inscriptos: [
      { id: 1, nombre: 'Luis Méndez', email: 'luis@email.com', telefono: '3100000000', fechaInscripcion: '2024-05-10T00:00:00Z' }
    ],
    organizador: { id: 1, nombre: 'SGDI', email: 'contacto@sgdi.com' },
    createdAt: '2024-05-10T00:00:00Z',
    updatedAt: '2024-05-10T00:00:00Z' },
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
