export type RolUsuario = 'admin' | 'supervisor' | 'usuario'

export interface Usuario {
  id:        number
  nombre:    string
  email:     string
  rol:       RolUsuario
  estado:    'activo' | 'inactivo'
  avatar?:   string
  createdAt: string
  updatedAt: string
}

export interface UsuarioFormData {
  nombre:    string
  email:     string
  rol:       RolUsuario
  estado:    'activo' | 'inactivo'
  password?: string
}
