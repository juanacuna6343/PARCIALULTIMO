# 🚀 PARCIALULTIMO - SGDI Beta 1

**Sistema de Gestión Digital Integrado** - Aplicación fullstack para administración de clientes, servicios, suscripciones, eventos y pipeline comercial.

---

## 📌 Tabla de Contenidos

- [Resumen](#resumen)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Disponible](#api-disponible)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Datos Mock](#datos-mock)
- [Tecnologías](#tecnologías)
- [Notas Importantes](#notas-importantes)
- [Próximas Mejoras](#próximas-mejoras)

---

## 🧾 Resumen

PARCIALULTIMO es una plataforma completa para gestión empresarial con:

- **Frontend**: React + Vite + TypeScript con Tailwind CSS
- **Backend**: Node.js + Express con autenticación JWT
- **Base de datos**: Supabase (opcional) o mock data local
- **Componentes**: UI moderna, validación en tiempo real, gráficos interactivos


---

## ✨ Características Principales

✅ **Autenticación y Autorización**
- Login con JWT
- Rutas protegidas con AuthGuard
- Logout automático por expiración

✅ **Gestión de Clientes**
- CRUD completo de clientes
- Filtrado y búsqueda
- Estado y contactos

✅ **Servicios**
- Catálogo de servicios
- Precios y descripciones
- Gestión de disponibilidad

✅ **Suscripciones**
- Creación y renovación de suscripciones
- Diferentes frecuencias (mensual, trimestral, etc.)
- Cálculo automático de fechas de renovación
- Validación de clientes existentes

✅ **Calendario e Eventos**
- Calendario interactivo con FullCalendar
- Gestión de tareas
- Inscripción a eventos
- Recordatorios

✅ **Pipeline de Ventas**
- Gestión de oportunidades
- Seguimiento de etapas
- Estadísticas del pipeline
- Dashboard con indicadores

✅ **Dashboard**
- KPIs en tiempo real
- Gráficos de desempeño
- Resumen de actividades

---

## 🔧 Requisitos

- **Node.js** 18+
- **npm** 9+
- **Git**
- *(Opcional)* Supabase account para sincronización en la nube

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/juanacuna6343/PARCIALULTIMO.git
cd PARCIALULTIMO
```

### 2. Instalar Backend

```bash
cd backend
npm install
```

### 3. Instalar Frontend

```bash
cd frontend
npm install
```

### 4. Configurar Variables de Entorno (Opcional)

Copiar `.env.example` a `.env` en backend:
```bash
cd backend
cp .env.example .env
```

Configurar según necesidad:
- `SUPABASE_URL` - URL de Supabase
- `SUPABASE_ANON_KEY` - API key de Supabase
- `JWT_SECRET` - Secreto para JWT
- `PORT` - Puerto del servidor (default: 5001)

---

## ▶️ Ejecución

### Terminal 1 - Backend

```bash
cd backend
npm start
```

**URL API**: `http://localhost:5001`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

**URL Frontend**: `http://localhost:5173` (o siguiente puerto disponible)

---

## 📁 Estructura del Proyecto

```
PARCIALULTIMO/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── clienteController.js
│   │   │   ├── servicioController.js
│   │   │   ├── suscripcionController.js
│   │   │   ├── eventoController.js
│   │   │   ├── oportunidadController.js
│   │   │   └── ... (otros controllers)
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── Usuario.js
│   │   │   ├── Cliente.js
│   │   │   ├── Servicio.js
│   │   │   ├── Suscripcion.js
│   │   │   └── ... (otros modelos)
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── clientes.js
│   │   │   ├── servicios.js
│   │   │   ├── suscripciones.js
│   │   │   └── ... (otros routes)
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── mockData.js
│   │   └── seed.js
│   ├── package.json
│   └── API_DOCUMENTATION.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── clientes/
│   │   │   ├── servicios/
│   │   │   ├── suscripciones/
│   │   │   ├── eventos/
│   │   │   ├── pipeline/
│   │   │   ├── calendario/
│   │   │   └── usuarios/
│   │   ├── layouts/
│   │   │   ├── AppLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ClientesPage.tsx
│   │   │   ├── ServiciosPage.tsx
│   │   │   ├── SuscripcionesPage.tsx
│   │   │   ├── EventosPage.tsx
│   │   │   ├── PipelinePage.tsx
│   │   │   ├── CalendarioPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── UsuariosPage.tsx
│   │   │   └── ArchivosPage.tsx
│   │   ├── router/
│   │   │   ├── AuthGuard.tsx
│   │   │   └── index.tsx
│   │   ├── services/
│   │   ├── store/
│   │   │   ├── useAuthStore.ts
│   │   │   └── useUIStore.ts
│   │   ├── types/
│   │   ├── styles/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── queryClient.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── docs/
│   ├── DISEÑO_TÉCNICO_INICIAL_DEL_SISTEMA.md
│   ├── SUPABASE_DATABASE_SCHEMA.md
│   └── SUPABASE_INTEGRATION.md
│
└── README.md
```

---

## 🔌 API Disponible

### Autenticación
```
POST   /api/v1/auth/login          - Login con email/contraseña
GET    /api/v1/auth/profile        - Obtener perfil del usuario
```

### Clientes
```
GET    /api/v1/clientes            - Listar todos los clientes
POST   /api/v1/clientes            - Crear nuevo cliente
GET    /api/v1/clientes/:id        - Obtener cliente específico
PUT    /api/v1/clientes/:id        - Actualizar cliente
DELETE /api/v1/clientes/:id        - Eliminar cliente
```

### Servicios
```
GET    /api/v1/servicios           - Listar servicios
POST   /api/v1/servicios           - Crear servicio
GET    /api/v1/servicios/:id       - Obtener servicio
PUT    /api/v1/servicios/:id       - Actualizar servicio
DELETE /api/v1/servicios/:id       - Eliminar servicio
```

### Suscripciones
```
GET    /api/v1/suscripciones       - Listar suscripciones
POST   /api/v1/suscripciones       - Crear suscripción
GET    /api/v1/suscripciones/:id   - Obtener suscripción
PUT    /api/v1/suscripciones/:id   - Actualizar suscripción
DELETE /api/v1/suscripciones/:id   - Eliminar suscripción
POST   /api/v1/suscripciones/:id/renovar - Renovar suscripción
```

### Eventos
```
GET    /api/v1/eventos             - Listar eventos
POST   /api/v1/eventos             - Crear evento
GET    /api/v1/eventos/:id         - Obtener evento
PUT    /api/v1/eventos/:id         - Actualizar evento
DELETE /api/v1/eventos/:id         - Eliminar evento
POST   /api/v1/eventos/:id/inscribir      - Inscribirse
POST   /api/v1/eventos/:id/desinscribir   - Desinscribirse
```

### Pipeline de Ventas (Oportunidades)
```
GET    /api/v1/pipeline            - Listar oportunidades
POST   /api/v1/pipeline            - Crear oportunidad
GET    /api/v1/pipeline/:id        - Obtener oportunidad
PUT    /api/v1/pipeline/:id        - Actualizar oportunidad
DELETE /api/v1/pipeline/:id        - Eliminar oportunidad
GET    /api/v1/pipeline/stats      - Obtener estadísticas
```

### Calendario/Tareas
```
GET    /api/v1/calendario          - Listar tareas
POST   /api/v1/calendario          - Crear tarea
GET    /api/v1/calendario/:id      - Obtener tarea
PUT    /api/v1/calendario/:id      - Actualizar tarea
DELETE /api/v1/calendario/:id      - Eliminar tarea
PUT    /api/v1/calendario/:id/completar - Marcar completada
```

### Usuarios
```
GET    /api/v1/usuarios            - Listar usuarios
POST   /api/v1/usuarios            - Crear usuario
GET    /api/v1/usuarios/:id        - Obtener usuario
PUT    /api/v1/usuarios/:id        - Actualizar usuario
DELETE /api/v1/usuarios/:id        - Eliminar usuario
```

### Dashboard
```
GET    /api/v1/dashboard           - Obtener KPIs y estadísticas
```

---

## 🧪 Credenciales de Prueba

### Usuario Admin
```
Email:       admin@sgdi.local
Contraseña:  Admin123!
Rol:         Administrador
```

### Otros Usuarios Disponibles
- **supervisor@sgdi.local** / `Admin123!` - Rol Supervisor
- **user@sgdi.local** / `Admin123!` - Rol Usuario

---

## � Datos Mock

El sistema incluye datos simulados para desarrollo y pruebas:

| Entidad | Cantidad | Descripción |
|---------|----------|-------------|
| Usuarios | 3 | Admin, Supervisor, Usuario |
| Clientes | 5+ | Con estado y contacto |
| Servicios | 5+ | Con precios y descripciones |
| Suscripciones | 3+ | Con diferentes frecuencias |
| Eventos | 2+ | Con capacidad y descripciones |
| Tareas | 3+ | Con responsables |
| Oportunidades | 6+ | En diferentes etapas |

**Nota**: Los datos mock se restablecen cada vez que se reinicia el servidor.

---

## 🛠️ Tecnologías

### Backend
- **Express.js** 4.18.4 - Framework web HTTP
- **Node.js** 18+ - Runtime JavaScript
- **Supabase** - Base de datos en la nube (opcional)
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - JWT para autenticación
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React** 18+ - Librería UI
- **TypeScript** 5+ - Type safety
- **Vite** 5+ - Build tool
- **React Router** 6+ - Enrutamiento
- **React Query** 5+ - Data fetching y caching
- **Zustand** - State management ligero
- **Tailwind CSS** 3+ - Utilidades CSS
- **React Hook Form** 7+ - Gestión de formularios
- **Zod** 3+ - Validación de esquemas
- **Framer Motion** - Animaciones suaves
- **FullCalendar** 6+ - Calendario interactivo
- **Recharts** 2+ - Gráficos y visualización
- **Lucide React** - Iconos modernos
- **date-fns** 3+ - Utilidades de fecha

---

## 🔐 Credenciales de Prueba

### Usuario Admin
```
Email: admin@sgdi.local
Contraseña: Admin123!
Rol: Admin
```

### Otros usuarios de prueba disponibles
- **supervisor@sgdi.local** - Rol Supervisor
- **user@sgdi.local** - Rol Usuario

---

## � Notas Importantes

### 🗄️ Almacenamiento de Datos
- **Sin Supabase configurado**: Los datos se guardan en memoria y se pierden al reiniciar
- **Con Supabase**: Los datos persisten en la nube
- Los datos mock se pueden modificar sin afectar Supabase

### 🔐 Seguridad
- JWT con expiración configurable
- Contraseñas hasheadas con bcryptjs
- CORS restriccionado a localhost en desarrollo
- Variables de entorno para credenciales sensibles

### 🚀 Para Producción
Antes de desplegar, considerar:
- Cambiar JWT_SECRET a un valor seguro
- Configurar variables de entorno en el servidor
- Implementar rate limiting
- Usar HTTPS obligatorio
- Agregar logging y monitoring
- Configurar base de datos real (Supabase o PostgreSQL)
- Ejecutar validaciones más estrictas
- Implementar backup automático

### ⚠️ Archivos Ignorados
`.env`, `.env.local`, `node_modules/`, `dist/`, `.DS_Store` y `login.json` están en `.gitignore`

---

## 🔄 Workflow de Desarrollo

```bash
# 1. Terminal 1: Backend
cd backend && npm start
# Backend en http://localhost:5001

# 2. Terminal 2: Frontend
cd frontend && npm run dev
# Frontend en http://localhost:5173

# 3. Abrir navegador
# Navegar a http://localhost:5173

# 4. Login con credenciales de prueba
# admin@sgdi.local / Admin123!
```

---

## 📚 Documentación Adicional

- [API Documentation](backend/API_DOCUMENTATION.md) - Documentación detallada de endpoints
- [Diseño Técnico](docs/DISEÑO_TÉCNICO_INICIAL_DEL_SISTEMA.md) - Arquitectura y diseño
- [Supabase Schema](docs/SUPABASE_DATABASE_SCHEMA.md) - Estructura de BD
- [Supabase Integration](docs/SUPABASE_INTEGRATION.md) - Guía de integración

---

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos real (PostgreSQL)
- [ ] Sistema de permisos granulares (RBAC)
- [ ] Reportes exportables (PDF, Excel)
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Integración con correo electrónico
- [ ] Sistema de respaldos automáticos
- [ ] API documentada con Swagger/OpenAPI
- [ ] Tests unitarios e integración
- [ ] Dockerización del proyecto
- [ ] CI/CD pipeline
- [ ] Soporte multiidioma (i18n)
- [ ] Integración con terceros (Stripe, etc.)

---

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 👨‍💻 Desarrollado por

**Equipo UNIMINUTO** - Mayo 2026  
Sistema de Gestión Digital Integrado (SGDI) - BETA 1

---

**¡Gracias por usar PARCIALULTIMO! 🙌**

### Componentes Reutilizables
- Button, Input, Select
- Card, Badge, Avatar
- Modal, ConfirmModal
- Tabs, EmptyState
- Skeleton loaders

### Animaciones
- Page transitions con Framer Motion
- Card animations
- Staggered lists
- Smooth loading states

### Validación
- Zod para validación de schemas
- React Hook Form para forms
- Mensajes de error en tiempo real

### State Management
- Zustand para auth y UI state
- React Query para server state
- Query caching automático

---

## 🔄 Workflow de Desarrollo

```bash
# 1. Iniciar backend
cd backend && npm start

# 2. En otra terminal, iniciar frontend
cd frontend && npm run dev

# 3. Abrir navegador
# http://localhost:5173 o http://localhost:5174

# 4. Login con credenciales de prueba
```

---

## 📝 Notas Importantes

### 🗄️ Base de Datos
- **Sin BD externa**: Todos los datos se guardan en memoria
- Datos se pierden al reiniciar el servidor
- Perfecto para prototipado y desarrollo

### 🔑 Seguridad
- JWT con secreto configurable
- Contraseñas hasheadas con bcryptjs
- CORS configurado para localhost

### 🚀 Para Producción
- Implementar base de datos real (MongoDB, PostgreSQL)
- Usar variables de entorno
- Implementar rate limiting
- Validación más estricta
- Logs y monitoring

---

## 📞 Soporte

Para reportar bugs o sugerencias, por favor abre un issue en el repositorio.

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 👨‍💻 Desarrollado por

**Equipo UNIMINUTO** - Mayo 2026

---

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Sistema de permisos granulares
- [ ] Reportes exportables (PDF, Excel)
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Integración con correo electrónico
- [ ] Sistema de respaldos
- [ ] API documentada con Swagger
- [ ] Tests unitarios e integración
- [ ] Docker support
- [ ] CI/CD pipeline

---

**¡Gracias por usar SGDI! 🙌** Sistema de Gestión Digital Integrado (SGDI) - BETA 1.

## Estructura

- `backend/` - API REST con Node.js, Express y Sequelize.
- `frontend/` - SPA React con Vite.
- `docs/` - Documentación del diseño técnico.

## Inicio rápido

### Backend

1. Abrir terminal en `backend`
2. Ejecutar `npm install`
3. Copiar `.env.example` a `.env`
4. Ejecutar `npm run dev`

El backend se levantará en `http://localhost:5000`.

### Frontend

1. Abrir terminal en `frontend`
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`

El frontend se levantará en `http://localhost:5173`.

## Usuario de prueba

- Email: `admin@sgdi.local`
- Contraseña: `Admin123!`

## Notas

El backend usa SQLite por defecto. Si deseas usar PostgreSQL, cambia `DB_DIALECT=postgres` y configura las variables de conexión en `backend/.env`.
#   s g d i - b e t a 1 
 
 