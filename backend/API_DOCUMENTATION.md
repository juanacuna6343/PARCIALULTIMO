# 🚀 SGDI Backend API Documentation

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm run dev
```

El servidor escuchará en `http://localhost:5000/api/v1`

---

## 📚 Endpoints Disponibles

### 🔐 Autenticación

#### POST `/auth/login`
```json
{
  "email": "admin@sgdi.local",
  "password": "Admin123!"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": {
      "id": 1,
      "email": "admin@sgdi.local",
      "nombre": "Administrador",
      "rol": "admin"
    }
  }
}
```

#### GET `/auth/profile` (Protected)
Retorna el perfil del usuario autenticado.

---

### 👥 Clientes (`/clientes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos los clientes |
| GET | `/:id` | Obtener cliente específico |
| POST | `/` | Crear nuevo cliente |
| PUT | `/:id` | Actualizar cliente |
| DELETE | `/:id` | Eliminar cliente |

**POST Body:**
```json
{
  "nombre": "Empresa XYZ",
  "contacto": "Juan Pérez",
  "email": "contacto@empresa.com",
  "telefono": "+57 300 000 0000",
  "sector": "Tecnología",
  "estado": "activo"
}
```

---

### 💼 Servicios (`/servicios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar servicios |
| POST | `/` | Crear servicio |
| PUT | `/:id` | Actualizar servicio |
| GET | `/:id/hitos` | Listar hitos del servicio |
| POST | `/:id/hitos` | Agregar hito |

**POST Body:**
```json
{
  "tipo": "Consultoría Estratégica",
  "clienteId": 1,
  "fechaInicio": "2026-05-19",
  "fechaFin": "2026-06-19",
  "valor": 5000000,
  "estado": "en_progreso",
  "descripcion": "Consultoría de transformación digital"
}
```

---

### 💳 Suscripciones (`/suscripciones`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar suscripciones |
| GET | `/:id` | Obtener suscripción |
| POST | `/` | Crear suscripción |
| PUT | `/:id` | Actualizar suscripción |
| DELETE | `/:id` | Eliminar suscripción |
| POST | `/:id/renovar` | Renovar suscripción |

**POST Body:**
```json
{
  "nombre": "Plan Mensual Premium",
  "clienteId": 1,
  "valor": 1000000,
  "frecuencia": "mensual",
  "fechaInicio": "2026-05-19",
  "fechaRenovacion": "2026-06-19",
  "estado": "activa",
  "pago": "pagado"
}
```

**Frecuencias válidas:** `mensual`, `trimestral`, `semestral`, `anual`
**Estados:** `activa`, `vencida`, `pausada`, `cancelada`

---

### 🎤 Eventos (`/eventos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar eventos |
| GET | `/:id` | Obtener evento |
| POST | `/` | Crear evento |
| PUT | `/:id` | Actualizar evento |
| DELETE | `/:id` | Eliminar evento |
| POST | `/:id/inscribir` | Inscribir asistente |
| POST | `/:id/desinscribir` | Desinscribir asistente |

**POST Body:**
```json
{
  "titulo": "Charla: Transformación Digital",
  "descripcion": "Conferencia sobre transformación digital",
  "tipo": "charla",
  "fechaInicio": "2026-05-26T14:00:00",
  "fechaFin": "2026-05-26T16:00:00",
  "ubicacion": "Sala A",
  "cuposDisponibles": 100,
  "estado": "confirmado",
  "enlaceZoom": "https://zoom.us/j/..."
}
```

**Inscripción Body:**
```json
{
  "nombre": "Pedro González",
  "email": "pedro@email.com",
  "telefono": "+57 300 000 0000"
}
```

---

### 📈 Pipeline / Oportunidades (`/pipeline`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar oportunidades |
| GET | `/stats` | Estadísticas por etapa |
| GET | `/:id` | Obtener oportunidad |
| POST | `/` | Crear oportunidad |
| PUT | `/:id` | Actualizar oportunidad |
| DELETE | `/:id` | Eliminar oportunidad |
| PATCH | `/:id/etapa` | Cambiar etapa |

**POST Body:**
```json
{
  "titulo": "Proyecto Transformación",
  "descripcion": "Proyecto grande de consultoría",
  "clienteId": 1,
  "etapa": "propuesta",
  "valor": 15000000,
  "probabilidad": 60,
  "fechaEstimada": "2026-07-19",
  "prioridad": "alta"
}
```

**Etapas válidas:** `contacto`, `propuesta`, `negociacion`, `cierre`, `ganada`, `perdida`

---

### 📅 Calendario (`/calendario`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar tareas/eventos |
| POST | `/` | Crear tarea |
| PUT | `/:id` | Actualizar tarea |
| PUT | `/:id/completar` | Marcar como completada |

---

### 👤 Usuarios (`/usuarios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar usuarios |
| POST | `/` | Crear usuario |
| PUT | `/:id` | Actualizar usuario |
| DELETE | `/:id` | Desactivar usuario |

**POST Body:**
```json
{
  "nombre": "Nuevo Usuario",
  "email": "usuario@sgdi.local",
  "password": "SeguirPassword123!",
  "rol": "usuario",
  "activo": true
}
```

---

### 📊 Dashboard (`/dashboard`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener KPIs generales |
| GET | `/kpis` | Servicios por estado |

**Response:**
```json
{
  "success": true,
  "data": {
    "clientes": 25,
    "servicios": 18,
    "tareasPendientes": 12,
    "usuarios": 5
  }
}
```

---

## 🔒 Autenticación

Todos los endpoints excepto `/auth/login` requieren autenticación.

**Headers requeridos:**
```
Authorization: Bearer <token>
```

---

## 📊 Credenciales de Prueba (Seed Data)

```
Email: admin@sgdi.local
Contraseña: Admin123!

Email: user@sgdi.local
Contraseña: User123!
```

---

## ⚡ Validación de Datos

La API valida automáticamente:
- Email válido
- Valores numéricos positivos
- Fechas válidas
- Campos requeridos

---

## 🐛 Códigos de Error

| Código | Status | Significado |
|--------|--------|-------------|
| `AUTH_REQUIRED` | 401 | Token no proporcionado |
| `AUTH_FAILED` | 401 | Token inválido o expirado |
| `NOT_FOUND` | 404 | Recurso no encontrado |
| `VALIDATION_ERROR` | 400 | Error en validación |
| `UNIQUE_CONSTRAINT` | 409 | Campo duplicado |
| `SERVER_ERROR` | 500 | Error interno |

---

## 📝 Scripts NPM

```bash
npm run dev      # Iniciar en modo desarrollo (con nodemon)
npm start        # Iniciar en modo producción
npm run lint     # Ejecutar ESLint
```

---

## 🗄️ Base de Datos

### Configuración

**Development:** SQLite (`./data/sgdi.sqlite`)
**Production:** PostgreSQL (configurable vía .env)

### Modelos

- **Usuario** - Usuarios del sistema
- **Cliente** - Clientes/Prospectos
- **Servicio** - Servicios/Consultorías
- **Suscripcion** - Contratos recurrentes
- **Evento** - Charlas y eventos
- **Oportunidad** - Pipeline de ventas
- **Tarea** - Tareas y hitos
- **Documento** - Archivos asociados
- **AuditLog** - Registro de cambios

---

## 🔧 Configuración

Crear `.env` basado en `.env.example`:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
DB_DIALECT=sqlite
DB_STORAGE=./data/sgdi.sqlite
SEED=true
```

---

## 🚀 Deployment

### Heroku

```bash
git add .
git commit -m "Deploy SGDI Backend"
git push heroku main
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
CMD ["npm", "start"]
```

---

## 📞 Soporte

Para preguntas o problemas, revisar los logs del servidor:

```bash
npm run dev
# Check console output for errors
```
