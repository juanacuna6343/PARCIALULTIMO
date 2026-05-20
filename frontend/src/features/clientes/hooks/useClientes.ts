import api from '../../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PaginatedResponse, ApiResponse } from '../../../types/api.types'
import type { Cliente, ClienteFormData } from '../../../types/cliente.types'
import { toast } from 'sonner'

const MOCK_CLIENTES: Cliente[] = [
  { id: 1, nombre: 'María García', email: 'maria@email.com', telefono: '310-123-4567', empresa: 'Tech Solutions', estado: 'activo', createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z' },
  { id: 2, nombre: 'Carlos Rodríguez', email: 'carlos@email.com', telefono: '320-234-5678', empresa: 'Innovate Corp', estado: 'activo', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
  { id: 3, nombre: 'Ana Martínez', email: 'ana@email.com', telefono: '315-345-6789', estado: 'activo', createdAt: '2024-02-15T00:00:00Z', updatedAt: '2024-02-15T00:00:00Z' },
  { id: 4, nombre: 'Luis Herrera', email: 'luis@email.com', telefono: '300-456-7890', empresa: 'Digital Agency', estado: 'inactivo', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
  { id: 5, nombre: 'Sofia Torres', email: 'sofia@email.com', telefono: '318-567-8901', empresa: 'StartUp Hub', estado: 'activo', createdAt: '2024-03-15T00:00:00Z', updatedAt: '2024-03-15T00:00:00Z' },
  { id: 6, nombre: 'Andrés López', email: 'andres@email.com', telefono: '311-678-9012', estado: 'activo', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z' },
]

const fetchClientes = async (): Promise<Cliente[]> => {
  try {
    const { data } = await api.get<ApiResponse<Cliente[]>>('/clientes')
    return data.success ? data.data : MOCK_CLIENTES
  } catch {
    return MOCK_CLIENTES
  }
}

export const useClientes = () =>
  useQuery({ queryKey: ['clientes'], queryFn: fetchClientes, staleTime: 1000 * 60 * 5 })

export const useCreateCliente = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: ClienteFormData) =>
      api.post<ApiResponse<Cliente>>('/clientes', data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clientes'] })
      toast.success('Cliente creado correctamente')
    },
    onError: () => toast.error('Error al crear el cliente'),
  })
}

export const useUpdateCliente = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ClienteFormData> }) =>
      api.put<ApiResponse<Cliente>>(`/clientes/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clientes'] })
      toast.success('Cliente actualizado correctamente')
    },
    onError: () => toast.error('Error al actualizar el cliente'),
  })
}

export const useDeleteCliente = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/clientes/${id}`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clientes'] })
      toast.success('Cliente eliminado')
    },
    onError: () => toast.error('Error al eliminar el cliente'),
  })
}
