export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  data:    T[]
  total:   number
  page:    number
  limit:   number
  pages:   number
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

// Auth
export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  usuario: {
    id: number
    email: string
    nombre: string
    rol: 'admin' | 'usuario' | 'supervisor'
  }
}

// Dashboard
export interface DashboardStats {
  clientes: number
  servicios: number
  tareasPendientes: number
  usuarios: number
}

export interface KPIData {
  serviciosPorEstado: Array<{
    estado: string
    cantidad: number
  }>
}

// Pipeline Stats
export interface PipelineStats {
  [etapa: string]: {
    cantidad: number
    valorTotal: number
  }
}

