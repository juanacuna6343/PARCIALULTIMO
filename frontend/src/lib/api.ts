import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    '/api/v1',
  timeout: 15_000,
})

// ── Request: inyecta JWT y ajusta Content-Type para FormData ─────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sgdi_token')
  if (token) config.headers.Authorization = `Bearer ${token}`

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

// ── Response: maneja 401 ─────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export default api
