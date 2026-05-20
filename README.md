# 🚀 PARCIALULTIMO / SGDI Beta 1

**PARCIALULTIMO** es una aplicación fullstack para administración de clientes, servicios, suscripciones, eventos y pipeline comercial.

Se divide en dos partes:
- `backend` con API REST en Node.js + Express
- `frontend` en React + Vite + TypeScript

---

## 📌 Contenido

- [Resumen](#resumen)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API disponible](#api-disponible)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Notas importantes](#notas-importantes)

---

## 🧾 Resumen

Este proyecto ofrece un sistema de gestión digital para:
- Clientes
- Servicios
- Suscripciones
- Eventos y calendario
- Pipeline de ventas
- Usuarios y roles

Está pensado como un prototipo funcional con datos simulados en backend.

---

## ✨ Características principales

- Login con JWT
- Autorización de rutas protegidas
- CRUD de clientes y servicios
- Gestión de suscripciones
- Calendario interactivo con FullCalendar
- Pipeline de oportunidades
- Dashboard con indicadores
- Manejo de estado con Zustand
- API REST simplificada

---

## 🔧 Requisitos

- Node.js 18 o superior
- npm 9 o superior
- Git

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanacuna6343/PARCIALULTIMO.git
cd PARCIALULTIMO
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Ejecución

### Backend

```bash
cd backend
npm start
```

- URL de la API: `http://localhost:5001`

### Frontend

```bash
cd frontend
npm run dev
```

- URL del cliente: normalmente `http://localhost:5173`

---

## 📁 Estructura del proyecto

```text
PARCIALULTIMO/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   ├── mockData.js
│   │   └── server.js
│   ├── package.json
│   └── API_DOCUMENTATION.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── postcss.config.js
│
└── README.md
```

---

## 🔌 API disponible

### Autenticación

```http
POST /api/v1/auth/login
GET  /api/v1/auth/profile
```

### Clientes

```http
GET    /api/v1/clientes
POST   /api/v1/clientes
GET    /api/v1/clientes/:id
PUT    /api/v1/clientes/:id
DELETE /api/v1/clientes/:id
```

### Servicios

```http
GET    /api/v1/servicios
POST   /api/v1/servicios
GET    /api/v1/servicios/:id
PUT    /api/v1/servicios/:id
DELETE /api/v1/servicios/:id
```

### Suscripciones

```http
GET    /api/v1/suscripciones
POST   /api/v1/suscripciones
GET    /api/v1/suscripciones/:id
PUT    /api/v1/suscripciones/:id
DELETE /api/v1/suscripciones/:id
```

### Eventos / Calendario

```http
GET    /api/v1/calendario
POST   /api/v1/calendario
DELETE /api/v1/calendario/:id
```

### Oportunidades / Pipeline

```http
GET    /api/v1/pipeline
POST   /api/v1/pipeline
PUT    /api/v1/pipeline/:id
DELETE /api/v1/pipeline/:id
```

---

## 🧪 Credenciales de prueba

- Usuario: `admin@sgdi.local`
- Contraseña: `Admin123!`

---

## 📝 Notas importantes

- El backend usa datos mock. Si quieres conectar una base real, debes agregar la configuración de base de datos en `backend/src/config/env.js`.
- El login usa JWT con expiración.
- Si el frontend no carga CSS, verifica que existe `frontend/src/vite-env.d.ts` y que el proyecto está bien configurado.

---

## 🧹 Git y organización

- Asegúrate de tener el remote correcto:
  ```bash
git remote set-url origin git@github.com:juanacuna6343/PARCIALULTIMO.git
```
- Haz commits claros y pequeños.
- Usa `git status` para revisar cambios antes de pushear.
- Si hay conflicto de permisos, revisa tu cuenta GitHub y credenciales.

---

## 📎 Recursos

- Frontend: `frontend/`
- Backend: `backend/`
- Documentación API: `backend/API_DOCUMENTATION.md`

---

Gracias por usar `PARCIALULTIMO`. Si quieres, también puedo ayudarte a generar un `.gitignore` limpio y organizar los commits antes de subir todo.  
```
GET    /api/v1/suscripciones     - Listar suscripciones
POST   /api/v1/suscripciones     - Crear suscripción
PUT    /api/v1/suscripciones/:id - Actualizar suscripción
DELETE /api/v1/suscripciones/:id - Eliminar suscripción
```

### Eventos
```
GET    /api/v1/eventos           - Listar eventos
POST   /api/v1/eventos           - Crear evento
PUT    /api/v1/eventos/:id       - Actualizar evento
DELETE /api/v1/eventos/:id       - Eliminar evento
POST   /api/v1/eventos/:id/inscribir    - Inscribirse a evento
POST   /api/v1/eventos/:id/desinscribir - Desinscribirse
```

### Pipeline de Ventas
```
GET    /api/v1/pipeline          - Listar oportunidades
POST   /api/v1/pipeline          - Crear oportunidad
PUT    /api/v1/pipeline/:id      - Actualizar oportunidad
DELETE /api/v1/pipeline/:id      - Eliminar oportunidad
GET    /api/v1/pipeline/stats    - Estadísticas del pipeline
```

### Calendario/Tareas
```
GET    /api/v1/calendario        - Listar tareas
POST   /api/v1/calendario        - Crear tarea
PUT    /api/v1/calendario/:id    - Actualizar tarea
DELETE /api/v1/calendario/:id    - Eliminar tarea
PUT    /api/v1/calendario/:id/completar - Marcar como completada
```

### Usuarios
```
GET    /api/v1/usuarios          - Listar usuarios
POST   /api/v1/usuarios          - Crear usuario
PUT    /api/v1/usuarios/:id      - Actualizar usuario
DELETE /api/v1/usuarios/:id      - Eliminar usuario
```

### Dashboard
```
GET    /api/v1/dashboard         - Obtener KPIs
```

---

## 🛠️ Tecnologías

### Backend
- **Express.js** 4.18.4 - Framework web
- **Node.js** - Runtime
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - JWT para autenticación
- **cors** - CORS middleware
- **dotenv** - Variables de entorno

### Frontend
- **React** 18.3.1 - UI Framework
- **TypeScript** 6.0.3 - Type safety
- **Vite** 5.4.1 - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navegación
- **React Query** - Data fetching
- **Zustand** - State management
- **React Hook Form** - Forms
- **Zod** - Schema validation
- **Framer Motion** - Animaciones
- **FullCalendar** - Calendario
- **Recharts** - Gráficos
- **Lucide React** - Icons
- **date-fns** - Utilidades de fecha

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

## 📊 Datos Mock

El sistema incluye datos simulados para todas las entidades:

| Entidad | Cantidad | Descripción |
|---------|----------|-------------|
| Usuarios | 3 | Admin, Supervisor, Usuario |
| Clientes | 5+ | Con estado y contacto |
| Servicios | 5+ | Con precios y estados |
| Tareas | 3+ | Con responsables |
| Suscripciones | 3+ | Con diferentes frecuencias |
| Eventos | 2+ | Con capacidad |
| Oportunidades | 6+ | En diferentes etapas |

---

## 🎨 Características Frontend

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