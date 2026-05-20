import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/api'
import type { Evento, EventoFormData } from '../../../types/calendario.types'
import type { ApiResponse } from '../../../types/api.types'
import { toast } from 'sonner'

const MOCK_EVENTOS: Evento[] = [
  { id: 1, titulo: 'Reunión kickoff', tipo: 'reunion', fechaInicio: new Date().toISOString(), todoElDia: false, clienteId: 1, clienteNombre: 'María García', color: '#3B6FD4', createdAt: new Date().toISOString() },
  { id: 2, titulo: 'Entrega diseño', tipo: 'tarea', fechaInicio: new Date(Date.now() + 86400000 * 2).toISOString(), todoElDia: true, color: '#F59E0B', createdAt: new Date().toISOString() },
  { id: 3, titulo: 'Cita con cliente', tipo: 'cita', fechaInicio: new Date(Date.now() + 86400000 * 5).toISOString(), fechaFin: new Date(Date.now() + 86400000 * 5 + 3600000).toISOString(), todoElDia: false, clienteId: 2, clienteNombre: 'Carlos Rodríguez', color: '#10B981', createdAt: new Date().toISOString() },
]

const fetchEventos = async (): Promise<Evento[]> => {
  try {
    const { data } = await api.get<ApiResponse<Evento[]>>('/calendario')
    return data.success ? data.data : MOCK_EVENTOS
  } catch { return MOCK_EVENTOS }
}

export const useEventos = () =>
  useQuery({ queryKey: ['eventos'], queryFn: fetchEventos })

export const useCreateEvento = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (d: EventoFormData) => api.post('/calendario', d).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['eventos'] }); toast.success('Evento creado') },
    onError: () => toast.error('Error al crear el evento'),
  })
}

export const useDeleteEvento = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/calendario/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['eventos'] }); toast.success('Evento eliminado') },
    onError: () => toast.error('Error al eliminar el evento'),
  })
}
