import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/api'
import type { Usuario, UsuarioFormData } from '../../../types/usuario.types'
import type { ApiResponse } from '../../../types/api.types'
import { toast } from 'sonner'

const MOCK_USUARIOS: Usuario[] = [
  { id: 1, nombre: 'Admin Principal', email: 'admin@sgdi.local', rol: 'admin', estado: 'activo', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 2, nombre: 'Laura Supervisora', email: 'laura@sgdi.local', rol: 'supervisor', estado: 'activo', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
  { id: 3, nombre: 'Pedro Operador', email: 'pedro@sgdi.local', rol: 'usuario', estado: 'activo', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
  { id: 4, nombre: 'Diana Asistente', email: 'diana@sgdi.local', rol: 'usuario', estado: 'inactivo', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z' },
]

const fetchUsuarios = async (): Promise<Usuario[]> => {
  try {
    const { data } = await api.get<ApiResponse<Usuario[]>>('/usuarios')
    return data.success ? data.data : MOCK_USUARIOS
  } catch { return MOCK_USUARIOS }
}

export const useUsuarios = () =>
  useQuery({ queryKey: ['usuarios'], queryFn: fetchUsuarios })

export const useCreateUsuario = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (d: UsuarioFormData) => api.post('/usuarios', d).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['usuarios'] }); toast.success('Usuario creado') },
    onError: () => toast.error('Error al crear el usuario'),
  })
}

export const useUpdateUsuario = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UsuarioFormData> }) =>
      api.put(`/usuarios/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['usuarios'] }); toast.success('Usuario actualizado') },
    onError: () => toast.error('Error al actualizar'),
  })
}

export const useDeleteUsuario = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/usuarios/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['usuarios'] }); toast.success('Usuario eliminado') },
    onError: () => toast.error('Error al eliminar'),
  })
}
