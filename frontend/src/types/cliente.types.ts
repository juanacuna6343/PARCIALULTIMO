export interface Cliente {
  id:         number
  nombre:     string
  email:      string
  telefono:   string
  empresa?:   string
  estado:     'activo' | 'inactivo'
  notas?:     string
  createdAt:  string
  updatedAt:  string
}

export interface ClienteFormData {
  nombre:   string
  email:    string
  telefono: string
  empresa?: string
  estado:   'activo' | 'inactivo'
  notas?:   string
}
