import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id:     number
  nombre: string
  email:  string
  rol:    'admin' | 'usuario' | 'supervisor'
  avatar?: string
}

interface AuthState {
  user:  AuthUser | null
  token: string | null
  login:  (user: AuthUser, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      token:           null,
      isAuthenticated: false,

      login: (user, token) => {
        localStorage.setItem('sgdi_token', token)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('sgdi_token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name:    'sgdi-auth',
      partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }),
    },
  ),
)
