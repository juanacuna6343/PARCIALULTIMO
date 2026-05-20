import api from '../../../lib/api'
import { useMutation } from '@tanstack/react-query'
import type { ApiResponse } from '../../../types/api.types'
import type { AuthUser } from '../../../store/useAuthStore'
import { useAuthStore } from '../../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface LoginResponse {
  token:   string
  usuario: AuthUser
}

const loginRequest = (email: string, password: string) =>
  api.post<ApiResponse<LoginResponse>>('/auth/login', { email, password }).then((r) => r.data)

export const useLogin = () => {
  const { login }  = useAuthStore()
  const navigate   = useNavigate()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),

    onSuccess: (data) => {
      if (data.success) {
        login(data.data.usuario, data.data.token)
        toast.success(`¡Bienvenido, ${data.data.usuario.nombre}!`)
        navigate('/dashboard')
      } else {
        toast.error(data.message ?? 'Credenciales incorrectas')
      }
    },

    onError: () => {
      toast.error('Error de conexión. Verifica que el servidor esté activo.')
    },
  })
}
