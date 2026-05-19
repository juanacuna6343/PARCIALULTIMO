# DISEÑO TÉCNICO INICIAL DEL SISTEMA

Sistema de Gestión Digital para Consultoría - BETA 1

Fase 1: Análisis, Diseño y Configuración del Entorno

Cliente: Brayan Camilo Clavijo Gómez

Desarrollador: Trucha Team

Versión: 1.0 | Estado: Documento de Trabajo

Fecha: Mayo 2026

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento

Este documento define la arquitectura técnica, estructura del proyecto, stack tecnológico y decisiones de diseño para el Sistema de Gestión Digital Integrado (SGDI) - BETA 1. Sirve como guía para el equipo de desarrollo y valida que las decisiones técnicas cumplan con los requerimientos y el contrato establecido.

### 1.2 Alcance

- Definición de arquitectura (3 capas)
- Stack tecnológico seleccionado y justificado
- Estructura de carpetas del proyecto
- Diagrama de componentes y flujos
- Configuración inicial del entorno
- Decisiones técnicas y restricciones
- Plan de desarrollo por fases

### 1.3 Documentos de Referencia

- `Levantamiento_Requerimientos_Sistema.md` - Requerimientos funcionales y no funcionales
- `Contrato_Desarrollo_Software.md` - Términos, alcance, presupuesto
- `RESUMEN_BETA1_Proyecto.md` - Visión ejecutiva

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Patrón Arquitectónico: Arquitectura por Capas (3 Capas)

```
┌─────────────────────────────────────────────────┐
│ CAPA DE PRESENTACIÓN │
│ (Frontend - React/Vue.js - PWA - navegador) │
├─────────────────────────────────────────────────┤
│ CAPA DE NEGOCIO/APIs │
│ (Backend - Node.js/Express - APIs REST) │
├─────────────────────────────────────────────────┤
│ CAPA DE PERSISTENCIA │
│ (Base de Datos - PostgreSQL) │
└─────────────────────────────────────────────────┘
```

### 2.2 Justificación de la Arquitectura

- Patrón: Arquitectura de 3 capas
  - Claridad en responsabilidades, fácil mantenimiento, escalable.
- Separación Frontend/Backend desacoplado
  - Independencia tecnológica, API reutilizable, facilita testing.
- Base de Datos Centralizada (PostgreSQL)
  - Integridad, transacciones, escalable, open source.
- Comunicación REST API + JSON
  - Estándar de la industria, simple, soporte universal en navegadores.
- Deployment Servidor único (inicialmente)
  - Viable presupuestariamente, simplifica operación en Beta 1.

### 2.3 Flujo General de Datos

1. Usuario interactúa con la interfaz.
2. Frontend envía una solicitud HTTP/HTTPS.
3. REST API la recibe y procesa la solicitud.
4. La lógica de negocio aplica reglas y consulta/actualiza la base de datos.
5. La base de datos responde con datos.
6. Backend envía Response JSON.
7. Frontend actualiza la UI.
8. Usuario ve el resultado.

## 3. STACK TECNOLÓGICO SELECCIONADO

### 3.1 Matriz de Decisiones Tecnológicas

- Capa Frontend:
  - Lenguaje: JavaScript (ES6+)
  - Framework: React o Vue.js 17+ / 3.x
  - Gestión de estado: Redux / Vuex
  - Routing: React Router / Vue Router 6+ / 4+
  - HTTP Client: Axios 1.x
  - Validación: Formik + Yup / VeeValidate
  - Styling: Tailwind CSS / Material-UI
  - PWA: Workbox / Service Workers nativo

- Capa Backend:
  - Lenguaje: Node.js 18+ LTS
  - Framework: Express.js 4.x
  - Validación: Joi / Yup
  - Autenticación: JWT + bcrypt
  - Logging: Winston / Morgan
  - Testing: Jest + Supertest

- Base de Datos:
  - Motor: PostgreSQL 14+
  - ORM: Sequelize / TypeORM
  - Migraciones: Sequelize CLI / Knex
  - Pool de conexiones: pg (nativo) o Sequelize

- Infraestructura:
  - Hosting: Heroku / AWS / Digital Ocean
  - Certificado SSL: Let's Encrypt
  - Backup automatizado: diario
  - Control de versiones: Git + GitHub/GitLab

### 3.2 Dependencias Clave

#### Frontend

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "redux": "^4.x",
    "react-redux": "^8.x",
    "tailwindcss": "^3.x",
    "formik": "^2.x",
    "yup": "^1.x"
  },
  "devDependencies": {
    "vite": "^4.x",
    "vitest": "^0.x"
  }
}
```

#### Backend

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "sequelize": "^6.x",
    "pg": "^8.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.x",
    "dotenv": "^16.x",
    "joi": "^17.x",
    "winston": "^3.x",
    "cors": "^2.x"
  },
  "devDependencies": {
    "nodemon": "^2.x",
    "jest": "^29.x",
    "supertest": "^6.x"
  }
}
```

## 4. ESTRUCTURA DEL PROYECTO

### 4.1 Árbol de Carpetas Global

```
sgdi-beta1/
├── frontend/ # Aplicación React/Vue.js
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json # PWA manifest
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   │   ├── Layout.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Dashboard/
│   │   │   ├── Cliente/
│   │   │   ├── Servicio/
│   │   │   ├── Calendario/
│   │   │   ├── Usuarios/
│   │   │   └── Common/ # Botones, modales, etc.
│   │   ├── pages/ # Páginas principales
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ClientesPage.jsx
│   │   │   ├── ServiciosPage.jsx
│   │   │   ├── CalendarioPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/ # Llamadas a API
│   │   │   ├── api.js # Configuración Axios
│   │   │   ├── authService.js
│   │   │   ├── clientService.js
n│   │   │   ├── servicioService.js
│   │   │   ├── calendarioService.js
│   │   │   └── usuarioService.js
│   │   ├── redux/ # Estado global
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── clienteSlice.js
│   │   │   │   ├── servicioSlice.js
│   │   │   │   └── calendarioSlice.js
│   │   │   └── actions/
│   │   ├── styles/ # Estilos globales
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── responsive.css
│   │   ├── utils/ # Funciones auxiliares
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── hooks/ # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useClientes.js
│   │   │   └── useFetch.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── serviceWorker.js # PWA service worker
│   ├── package.json
│   ├── vite.config.js # Configuración Vite
│   ├── tailwind.config.js # Configuración Tailwind
│   ├── .env.example
│   └── README.md
│
├── backend/ # API Node.js/Express
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js # Configuración Sequelize
│   │   │   ├── auth.js # Configuración JWT
│   │   │   └── env.js # Variables de entorno
│   │   ├── models/ # Modelos de Sequelize
│   │   │   ├── Usuario.js
│   │   │   ├── Cliente.js
│   │   │   ├── Servicio.js
│   │   │   ├── Tarea.js
│   │   │   ├── Documento.js
│   │   │   └── AuditLog.js
│   │   ├── controllers/ # Lógica de negocio
│   │   │   ├── authController.js
│   │   │   ├── clienteController.js
│   │   │   ├── servicioController.js
│   │   │   ├── calendarioController.js
│   │   │   ├── usuarioController.js
│   │   │   └── dashboardController.js
│   │   ├── routes/ # Rutas API
│   │   │   ├── auth.js
│   │   │   ├── clientes.js
│   │   │   ├── servicios.js
│   │   │   ├── calendario.js
│   │   │   ├── usuarios.js
│   │   │   ├── dashboard.js
│   │   │   └── index.js
│   │   ├── middleware/ # Middleware Express
│   │   │   ├── auth.js # Validación JWT
│   │   │   ├── errorHandler.js # Manejo de errores
│   │   │   ├── validation.js # Validación de datos
│   │   │   ├── rbac.js # Control de roles
│   │   │   └── logging.js # Logging de requests
│   │   ├── services/ # Servicios de negocio
│   │   │   ├── authService.js
│   │   │   ├── clienteService.js
│   │   │   ├── servicioService.js
│   │   │   ├── notificacionService.js
│   │   │   └── reporteService.js
│   │   ├── utils/ # Funciones auxiliares
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── jwt.js
│   │   │   ├── encryption.js
│   │   │   └── constants.js
│   │   ├── migrations/ # Migraciones BD
│   │   │   ├── 001-init.js
│   │   │   ├── 002-add-audit.js
│   │   │   └── ...
│   │   ├── seeders/ # Datos iniciales (dev)
│   │   │   ├── usuarios.js
│   │   │   ├── clientes.js
│   │   │   └── ...
│   │   ├── tests/ # Pruebas unitarias
│   │   │   ├── controllers.test.js
│   │   │   ├── services.test.js
│   │   │   └── ...
│   │   ├── app.js # Configuración Express
│   │   └── server.js # Punto de entrada
│   ├── .env.example
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   ├── .sequelizerc # Configuración Sequelize
│   ├── jest.config.js # Configuración Jest
│   ├── README.md
│   └── docs/
│       ├── API.md # Documentación API
│       └── DATABASE.md # Esquema BD
│
├── docs/ # Documentación del proyecto
│   ├── ARQUITECTURA.md
│   ├── SETUP.md
│   ├── API.md
│   ├── TESTING.md
│   ├── DEPLOYMENT.md
│   └── DISEÑO_TÉCNICO_INICIAL_DEL_SISTEMA.md
│
├── .gitignore
├── docker-compose.yml # (Opcional) Para desarrollo local
└── README.md # README principal
```

## 5. DIAGRAMA DE BASE DE DATOS (ER)

### 5.1 Entidades Principales

```
┌─────────────────┐
│ USUARIO │
├─────────────────┤
│ id (PK) │
│ email (UQ) │
│ password │
│ nombre │
│ rol │
│ activo │
│ createdAt │
│ updatedAt │
└─────────────────┘
 │
 │ (1:N)
 │
┌─────────────────┐ ┌─────────────────┐
│ CLIENTE │◄───────│ SERVICIO │
├─────────────────┤ ├─────────────────┤
│ id (PK) │ │ id (PK) │
│ nombre │ │ cliente_id (FK) │
│ contacto │ │ tipo │
│ email │ │ fecha_inicio │
│ telefono │ │ fecha_fin │
│ sector │ │ valor │
│ estado │ │ estado │
│ createdAt │ │ descripcion │
│ updatedAt │ │ createdAt │
└─────────────────┘ │ updatedAt │
 │ └─────────────────┘
 │ (1:N) │
 │ │ (1:N)
 ├──────────────────────────┤
 │ │
┌─────────────────┐ ┌─────────────────┐
│ DOCUMENTO │ │ TAREA │
├─────────────────┤ ├─────────────────┤
│ id (PK) │ │ id (PK) │
│ cliente_id (FK) │ │ servicio_id(FK) │
│ servicio_id(FK) │ │ titulo │
│ tipo │ │ fecha_vencto │
│ url_archivo │ │ prioridad │
│ nombre │ │ responsable_id │
│ tamaño │ │ completada │
│ createdAt │ │ createdAt │
│ updatedAt │ │ updatedAt │
└─────────────────┘ └─────────────────┘
```

### 5.2 Tabla de Auditoría

```
┌─────────────────────┐
│ AUDIT_LOG │
├─────────────────────┤
│ id (PK) │
│ usuario_id (FK) │
│ accion │ (CREATE, UPDATE, DELETE)
│ tabla_afectada │
│ registro_id │
│ cambios_antes │ (JSON)
│ cambios_despues │ (JSON)
│ ip_origen │
│ user_agent │
│ timestamp │
└─────────────────────┘
```

## 6. ESPECIFICACIÓN DE APIS (REST)

### 6.1 Convención de Endpoints

- `GET /api/v1/clientes` - Listar clientes
- `GET /api/v1/clientes/:id` - Obtener cliente por ID
- `POST /api/v1/clientes` - Crear cliente
- `PUT /api/v1/clientes/:id` - Actualizar cliente
- `DELETE /api/v1/clientes/:id` - Eliminar cliente
- `GET /api/v1/servicios` - Listar servicios
- `POST /api/v1/servicios` - Crear servicio
- `PUT /api/v1/servicios/:id` - Actualizar servicio
- `GET /api/v1/servicios/:id/hitos` - Ver hitos de servicio
- `POST /api/v1/servicios/:id/hitos` - Agregar hito
- `GET /api/v1/calendario` - Listar tareas del usuario
- `POST /api/v1/calendario` - Crear tarea
- `PUT /api/v1/calendario/:id` - Actualizar tarea
- `PUT /api/v1/calendario/:id/completar` - Marcar como completada
- `GET /api/v1/dashboard` - Dashboard del gerente
- `GET /api/v1/dashboard/kpis` - KPIs principales
- `POST /api/v1/auth/login` - Autenticación
- `POST /api/v1/auth/logout` - Cerrar sesión
- `POST /api/v1/auth/refresh` - Refrescar token
- `POST /api/v1/usuarios` - Crear usuario
- `GET /api/v1/usuarios` - Listar usuarios
- `PUT /api/v1/usuarios/:id` - Actualizar usuario
- `DELETE /api/v1/usuarios/:id` - Desactivar usuario

### 6.2 Estructura de Respuesta Estándar

#### Respuesta Exitosa (200)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Empresa X",
    "email": "contacto@empresa.com"
  },
  "message": "Cliente creado exitosamente"
}
```

#### Respuesta Error (4xx/5xx)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El email ya está registrado",
    "details": {
      "field": "email",
      "value": "contacto@empresa.com"
    }
  }
}
```

## 7. CONFIGURACIÓN DEL ENTORNO DE DESARROLLO

### 7.1 Requisitos del Sistema

| Componente | Versión Mínima | Recomendado |
| --- | --- | --- |
| Node.js | 16.x | 18.x LTS |
| npm | 7.x | 9.x |
| Git | 2.30+ | Reciente |
| PostgreSQL | 12.x | 14.x |
| Navegador | Chrome 90+ | Firefox/Edge reciente |
| Editor | VS Code | VS Code |

### 7.2 Instalación Inicial

```bash
# Clonar repositorio
git clone https://github.com/TruchaTeam/sgdi-beta1.git
cd sgdi-beta1

# Configurar Backend
cd backend
npm install
cp .env.example .env
npm run sequelize db:create
npm run sequelize db:migrate
npm run sequelize db:seed:all
npm run dev
# Servidor disponible en: http://localhost:5000

# Configurar Frontend
cd ../frontend
npm install
cp .env.example .env
npm run dev
# Aplicación disponible en: http://localhost:3000
```

### 7.3 Variables de Entorno

#### Backend (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sgdi_db
DB_USER=sgdi_user
DB_PASSWORD=SecurePassword123!
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=8h
CORS_ORIGIN=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

#### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_TITLE=SGDI - Sistema de Gestión Digital
VITE_LOG_LEVEL=debug
```

### 7.4 Base de Datos - Creación Inicial

```sql
CREATE DATABASE sgdi_db;
CREATE USER sgdi_user WITH PASSWORD 'SecurePassword123!';
ALTER ROLE sgdi_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE sgdi_db TO sgdi_user;
\c sgdi_db
GRANT ALL ON SCHEMA public TO sgdi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO sgdi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO sgdi_user;
```

## 8. DECISIONES TÉCNICAS CLAVE

### 8.1 Autenticación y Seguridad

- Auth: JWT (JSON Web Tokens)
  - Sin estado en servidor, escalable, estándar.
- Contraseñas: bcrypt con salt 10+
  - Seguro, resistente a ataques, slow by design.
- Sesiones: Token expira en 8h
  - Balance entre seguridad y UX.
- HTTPS obligatorio en producción
  - Encriptación en tránsito.
- CORS restringido al dominio cliente
  - Previene acceso no autorizado.
- Validación Input: Joi en backend
  - Previene inyección, XSS, SQL injection.

### 8.2 Gestión de Estado Frontend

- Decisión: Redux (si es React) o Vuex (si es Vue.js)
- Razones:
  - Centraliza estado de la aplicación.
  - Facilita debugging con Redux DevTools.
  - Predecible y fácil de testear.
  - Información se sincroniza automáticamente.

#### Flujo de estado

1. User Input
2. Dispatch Action
3. Reducer
4. New State
5. Re-render Components

### 8.3 Manejo de Errores

Estrategia:
1. Frontend: Validación de entrada + manejo de respuestas HTTP.
2. Backend: Try-catch, logging, respuestas consistentes.
3. Base de Datos: Transacciones ACID, rollback automático.

### 8.4 Performance y Escalabilidad

- Caching frontend con Redux store + localStorage para datos no críticos.
- Caching backend con Redis (futuro Beta 2) para sesiones y datos frecuentes.
- Base de datos: índices en campos de búsqueda, paginación 50 registros/página.
- API responses: compresión gzip, JSON minificado.
- PWA: Service Workers cachean assets estáticos, offline básico.

### 8.5 Versionado de APIs

- Estrategia: API versioning por URL.
  - `/api/v1/clientes` - Versión 1 (Beta 1)
  - `/api/v2/clientes` - Versión 2 (futuro)
- Beneficios:
  - Cambios sin romper clientes antiguos.
  - Deprecation gradual.
  - Compatibilidad hacia atrás.

## 9. PLAN DE DESARROLLO PHASED

### 9.1 Fase 1: Setup Inicial (Semanas 1-2)

Objetivos:
- Infraestructura en lugar.
- Entorno de desarrollo configurado.
- Primeros modelos de BD creados.
- Estructura base del proyecto.

Entregables:
- [ ] Repositorio Git inicializado.
- [ ] Backend scaffold creado.
- [ ] Frontend scaffold creado.
- [ ] Base de datos creada.
- [ ] Variables de entorno configuradas.
- [ ] README con instrucciones setup.

Tareas Técnicas:
- Crear proyecto Node.js con Express.
- Inicializar proyecto React/Vue.
- Configurar Sequelize y migraciones.
- Crear modelos iniciales.
- Setup linting (ESLint).
- Setup formatting (Prettier).
- Configurar Git hooks (husky).

### 9.2 Fase 2: Módulos Core (Semanas 3-5)

Módulos a implementar:
- M-01: Gestión de Clientes (CRUD).
- M-02: Gestión de Servicios (CRUD + estados).
- M-04: Dashboard básico (KPIs).
- M-05: Autenticación y Usuarios.

Entregables:
- [ ] APIs REST funcionando.
- [ ] Frontend básico accesible.
- [ ] Testing unitario >= 80%.
- [ ] Documentación API (Swagger).

### 9.3 Fase 3: Módulos Complementarios (Semanas 6-8)

Módulos a implementar:
- M-03: Calendario y Tareas.
- M-04: Dashboard ampliado.
- Alertas y notificaciones.
- PWA funcional.

### 9.4 Fase 4: Testing y Optimización (Semanas 9-10)

Actividades:
- Testing funcional completo.
- Pruebas de rendimiento.
- Optimización de queries.
- Security audit.

### 9.5 Fase 5: Entrega (Semanas 11-12)

Actividades:
- Documentación final.
- Capacitación cliente.
- Deployment a producción.
- Go-live.

## 10. HERRAMIENTAS DE DESARROLLO

### 10.1 IDE y Extensiones (VS Code)

Recomendadas:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- GitLens
- Thunder Client (para testing APIs)
- PostgreSQL
- Tailwind CSS IntelliSense
- Better Comments

### 10.2 Testing

Frontend:
- Vitest + React Testing Library
- Para testing de componentes y hooks.

Backend:
- Jest + Supertest
- Para testing de funciones y endpoints.

Base de Datos:
- Test fixtures con seeders.
- Transacciones rollback automático.

### 10.3 Documentación

- Swagger/OpenAPI: Documentación API interactiva.
- Jsdoc: Documentación de funciones en código.
- Markdown: Documentación técnica.

### 10.4 Versionado y Colaboración

Git Workflow:
- `main` (producción)
- `develop` (integración)
- `feature/*`
- `bugfix/*`
- `hotfix/*`

Reglas de Commits:
- `feat: ...`
- `fix: ...`
- `docs: ...`
- `test: ...`
- `refactor: ...`
- `style: ...`
- `chore: ...`

## 11. POLÍTICAS DE CÓDIGO

### 11.1 Estándares de Código

- Lenguaje: JavaScript ES6+
- Linter: ESLint
  - `npm run lint`
  - `npm run lint:fix`
- Formatter: Prettier
  - `npm run format`

Naming Conventions:
- Variables/Funciones: camelCase
- Clases/Componentes: PascalCase
- Constantes: UPPER_SNAKE_CASE
- Archivos: kebab-case.js

### 11.2 Testing Mínimos

- Objetivo: >= 80% cobertura.
- Tipos de Tests:
  - Unitarios: Funciones puras.
  - Integración: Endpoints API.
  - Componentes: React/Vue.

### 11.3 Seguridad

- Revisión de Código: mínimo 1 revisor antes de merge.
- No hardcodear credenciales.
- Validar todas las entradas.

## 12. MÉTRICAS Y MONITOREO

### 12.1 Métricas de Desarrollo

| Métrica | Objetivo | Herramienta |
| --- | --- | --- |
| Cobertura Testing | >= 80% | Jest coverage |
| Duplicación Código | <= 5% | SonarQube (futuro) |
| Complejidad Ciclomática | <= 10 | ESLint |
| Tiempo Respuesta API | < 500ms | Performance monitoring |
| Uptime | >= 99% | Health checks |

### 12.2 Logging y Monitoreo

Backend Logging:
- `INFO`: Cambios importantes.
- `WARN`: Situaciones anómalas.
- `ERROR`: Errores de aplicación.
- `DEBUG`: Información de desarrollo.

Monitoreo Producción:
- Errores no capturados (Sentry - futuro).
- Performance (New Relic - futuro).
- Disponibilidad (Uptime Robot).

## 13. TABLA DE DECISIONES TÉCNICAS

| Decisión | Alternativas Consideradas | Seleccionada | Razón |
| --- | --- | --- | --- |
| Framework Frontend | Angular, Vue, Next.js | React o Vue | Comunidad, curva aprendizaje, documentación |
| Framework Backend | Django, Laravel, ASP.NET | Express.js | Minimalista, flexible, JS full-stack |
| BD | MySQL, MongoDB, Firebase | PostgreSQL | ACID, relaciones, open source, escalable |
| Auth | Sessions, OAuth, API Keys | JWT | Sin estado, seguro, estándar industrial |
| Hosting | Heroku, AWS, Digital Ocean | A definir con cliente | Presupuesto y capacidad soporte |
| PWA vs App Nativa | App iOS/Android | PWA | Presupuesto, mantenimiento, viabilidad |
| Styling | CSS puro, SCSS, Tailwind | Tailwind CSS | Utility-first, responsive built-in |

## 14. RIESGOS TÉCNICOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- |
| Complejidad excesiva | Media | Alto | Arquitectura clara, separación responsabilidades |
| Performance degradado | Media | Medio | Índices BD, testing de carga, caché |
| Seguridad débil | Baja | Crítico | Security audit, validación input, HTTPS |
| Retrasos desarrollo | Media | Alto | Sprints claros, daily standups |
| Cambios requerimientos | Alta | Medio | Control de cambios formal |

## 15. CONTINUIDAD Y ESCALABILIDAD

### 15.1 Plan para Beta 2

Nuevos módulos:
- Portal cliente externo
- Reportes PDF automáticos
- Integración email avanzada
- Redis para caché

Mejoras:
- Análisis predictivo (IA)
- App móvil nativa
- Integración WhatsApp
- Multi-idioma

### 15.2 Scalability (Futuro)

- Microservicios: separar servicios (Autenticación, Reportes, etc.)
- Load Balancing: Nginx, escalado horizontal
- CDN: para assets estáticos
- Caché Distribuido: Redis cluster

## 16. DOCUMENTACIÓN COMPLEMENTARIA

### 16.1 Documentos Generados

- [ ] Swagger/OpenAPI (API interactiva)
- [ ] Jsdoc (Código fuente)
- [ ] Database schema (SQL)
- [ ] Deployment guide
- [ ] Security policy
- [ ] Troubleshooting guide

### 16.2 Wikis y Recursos

- `README.md` principal
- `docs/SETUP.md`
- `docs/API.md`
- `docs/TESTING.md`
- `docs/DEPLOYMENT.md`
- `docs/TROUBLESHOOTING.md`

## 17. APROBACIÓN Y VALIDACIÓN

### 17.1 Checklist Pre-Desarrollo

- [ ] Stack tecnológico aprobado por equipo.
- [ ] Arquitectura revisada por Líder Técnico.
- [ ] BD normalizada y validada.
- [ ] Entorno local funcionando.
- [ ] Git workflow establecido.
- [ ] Herramientas configuradas.
- [ ] Equipo capacitado en stack.

### 17.2 Firmas de Aprobación

| Rol | Nombre | Fecha | Firma |
| --- | --- | --- | --- |
| Líder Técnico | Freddy Stiven Castro Pardo | _ | _ |
| Desarrollador | Juan David Acuña Ballen | _ | _ |
| Desarrollador | Felipe Alejandro Patiño Hernández | _ | _ |
| Cliente | Brayan Camilo Clavijo Gómez | _ | _ |

## CONCLUSIÓN

Este documento establece la base técnica sólida para el desarrollo de SGDI BETA 1. La arquitectura de 3 capas, el stack seleccionado (React/Vue + Express + PostgreSQL), y las decisiones técnicas tomadas garantizan un sistema:

- Escalable: Fácil de extender en futuras fases.
- Mantenible: Código limpio, bien organizado, documentado.
- Seguro: Estándares de seguridad incorporados.
- Performante: Optimizado para 5+ usuarios simultáneos.
- Viable: Dentro del presupuesto y cronograma establecido.

El equipo de Trucha Team está listo para comenzar la Fase 2: Desarrollo Core (Semanas 3-5).

© 2026 – Documento Técnico Confidencial | Trucha Team

Cliente: Brayan Camilo Clavijo Gómez

Proyecto: Sistema de Gestión Digital Integrado (SGDI) - BETA 1

Fecha de Emisión: Mayo 2026

Versión: 1.0
