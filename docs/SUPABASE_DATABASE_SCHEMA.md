# Esquema de Base de Datos para Supabase

Este documento describe la estructura SQL recomendada para conectar el proyecto con Supabase.

Incluye las tablas principales usadas por el backend actual y sus relaciones.

## Tablas

### usuarios

```sql
create table usuarios (
  id serial primary key,
  email text not null unique,
  password text not null,
  nombre text not null,
  rol text not null default 'user',
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### clientes

```sql
create table clientes (
  id serial primary key,
  nombre text not null,
  contacto text,
  email text not null,
  telefono text,
  sector text,
  estado text not null default 'activo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### servicios

```sql
create table servicios (
  id serial primary key,
  cliente_id integer references clientes(id) on delete set null,
  tipo text not null,
  fecha_inicio date,
  fecha_fin date,
  valor numeric(12,2),
  estado text not null default 'pendiente',
  descripcion text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### suscripciones

```sql
create table suscripciones (
  id serial primary key,
  nombre text not null,
  descripcion text,
  cliente_id integer not null references clientes(id),
  valor numeric(12,2) not null,
  frecuencia text not null default 'mensual',
  fecha_inicio timestamptz not null,
  fecha_renovacion timestamptz not null,
  estado text not null default 'activa',
  pago text not null default 'pendiente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### oportunidades

```sql
create table oportunidades (
  id serial primary key,
  titulo text not null,
  descripcion text,
  cliente_id integer not null references clientes(id),
  responsable_id integer references usuarios(id),
  etapa text not null default 'contacto',
  valor numeric(12,2) not null default 0,
  probabilidad integer not null default 0,
  fecha_estimada timestamptz,
  notas text,
  prioridad text not null default 'media',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### eventos

```sql
create table eventos (
  id serial primary key,
  titulo text not null,
  descripcion text,
  tipo text not null default 'charla',
  fecha_inicio timestamptz not null,
  fecha_fin timestamptz not null,
  ubicacion text,
  cupos_disponibles integer not null default 100,
  cupos_ocupados integer not null default 0,
  inscriptos jsonb not null default '[]'::jsonb,
  estado text not null default 'planificado',
  organizador_id integer references usuarios(id),
  enlace_zoom text,
  material_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### documentos

```sql
create table documentos (
  id serial primary key,
  cliente_id integer references clientes(id),
  servicio_id integer references servicios(id),
  tipo text,
  url_archivo text,
  nombre text not null,
  tamano integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### tareas

```sql
create table tareas (
  id serial primary key,
  servicio_id integer references servicios(id),
  titulo text not null,
  descripcion text,
  fecha_vencimiento date,
  prioridad text not null default 'media',
  completada boolean not null default false,
  responsable_id integer references usuarios(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### audit_logs

```sql
create table audit_logs (
  id serial primary key,
  usuario_id integer,
  accion text not null,
  tabla_afectada text,
  registro_id integer,
  cambios_antes jsonb,
  cambios_despues jsonb,
  ip_origen text,
  user_agent text,
  timestamp timestamptz not null default now()
);
```

## Notas

- En Supabase, puedes ejecutar estas consultas en el editor SQL para crear las tablas.
- Para archivos reales, usa Supabase Storage y guarda en `documentos.url_archivo` la ruta del bucket.
- Ajusta los `ENUM` o valores por defecto si tu aplicación necesita un nombre de campo diferente.
- Si quieres, también puedo generar un script `supabase` más completo con índices y políticas de RLS.
