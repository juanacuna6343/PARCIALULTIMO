# Integración con Supabase

Este documento explica cómo conectar el proyecto a una base de datos PostgreSQL en Supabase.

## 1. Crear proyecto en Supabase

1. Ve a https://app.supabase.com
2. Crea un nuevo proyecto
3. En la sección de `Database` copia:
   - Host
   - Port
   - Database
   - User
   - Password

## 2. Crear las tablas usando el esquema

1. Abre el editor SQL de Supabase.
2. Copia el SQL del archivo `docs/SUPABASE_DATABASE_SCHEMA.md`.
3. Ejecuta el script para crear las tablas.

> Si quieres, utiliza también el SQL completo que está en ese documento.

## 3. Configurar el backend

1. Copia `.env.example` a `.env` en la raíz del proyecto.
2. Rellena las variables con los datos de tu proyecto Supabase.

Ejemplo:

```env
DB_DIALECT=postgres
DB_HOST=your-project-id.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-service-role-key
JWT_SECRET=tu-secreto
JWT_EXPIRES_IN=8h
CORS_ORIGIN=http://localhost:5173
```

3. Instala dependencias si no están instaladas:

```bash
cd backend
npm install
```

4. Inicia el servidor:

```bash
npm run dev
```

## 4. Qué hace el backend hoy

Actualmente el backend usa `mockData` en los controladores para devolver datos de ejemplo. Eso significa que:

- la configuración de la base de datos ya está lista
- pero todavía debes migrar los controladores para leer/escribir desde la base de datos

## 5. Siguiente paso recomendado

Para usar Supabase en este proyecto, puedes elegir:

- `Opción A`: mantener el backend Express/Sequelize y usar la base de datos de Supabase vía `pg` + Sequelize
- `Opción B`: usar el cliente `@supabase/supabase-js` en el frontend para consultar las tablas directamente

## 6. Nota sobre archivos

Si quieres subir archivos a Supabase, usa Supabase Storage para guardar el archivo y almacena en `documentos.url_archivo` la ruta del objeto.

## 7. Validar conexión

En el backend, `backend/src/config/env.js` y `backend/src/config/database.js` ya admiten PostgreSQL.

Además, el proyecto ahora incluye un cliente Supabase en `backend/src/lib/supabase.js` que puede usar el `SUPABASE_URL` y `SUPABASE_KEY` de tu `.env` para acceder a Supabase desde el servidor.

Si quieres, te ayudo a transformar un controlador de `mockData` en un controlador Sequelize que use la tabla `clientes` o `servicios`, o a crear rutas que usen directamente el cliente Supabase.
