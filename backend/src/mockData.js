// Mock Data para desarrollo sin base de datos
const bcrypt = require('bcryptjs');

// Datos simulados en memoria
let mockData = {
  usuarios: [
    {
      id: 1,
      email: 'admin@sgdi.local',
      password: bcrypt.hashSync('Admin123!', 10),
      nombre: 'Admin SGDI',
      rol: 'admin',
      activo: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      email: 'user@sgdi.local',
      password: bcrypt.hashSync('User123!', 10),
      nombre: 'Usuario Demo',
      rol: 'usuario',
      activo: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      email: 'supervisor@sgdi.local',
      password: bcrypt.hashSync('Supervisor123!', 10),
      nombre: 'Supervisor SGDI',
      rol: 'supervisor',
      activo: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ],
  clientes: [
    {
      id: 1,
      nombre: 'ACME Corporation',
      contacto: 'Juan García',
      email: 'juan@acme.com',
      telefono: '3001234567',
      sector: 'Tecnología',
      estado: 'activo',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      id: 2,
      nombre: 'MegaStore S.A.',
      contacto: 'María López',
      email: 'maria@megastore.com',
      telefono: '3009876543',
      sector: 'Retail',
      estado: 'activo',
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06'),
    },
    {
      id: 3,
      nombre: 'InnovaTech Solutions',
      contacto: 'Carlos Martínez',
      email: 'carlos@innovatech.com',
      telefono: '3005555555',
      sector: 'Consultoría',
      estado: 'activo',
      createdAt: new Date('2024-01-07'),
      updatedAt: new Date('2024-01-07'),
    },
  ],
  servicios: [
    {
      id: 1,
      tipo: 'Diagnóstico Organizacional',
      clienteId: 1,
      fechaInicio: new Date('2024-02-01'),
      fechaFin: new Date('2024-03-01'),
      valor: 5000000,
      estado: 'en_progreso',
      descripcion: 'Análisis completo de procesos organizacionales',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: 2,
      tipo: 'Capacitación en Procesos',
      clienteId: 2,
      fechaInicio: new Date('2024-02-15'),
      fechaFin: new Date('2024-03-15'),
      valor: 3000000,
      estado: 'pendiente',
      descripcion: 'Capacitación a equipo gerencial en mejora de procesos',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
    {
      id: 3,
      tipo: 'Implementación de Sistema',
      clienteId: 3,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-05-01'),
      valor: 8000000,
      estado: 'completado',
      descripcion: 'Implementación de SGDI',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ],
  tareas: [
    {
      id: 1,
      titulo: 'Recopilar información inicial',
      descripcion: 'Entrevistas con gerencia',
      fechaVencimiento: new Date('2024-02-10'),
      prioridad: 'alta',
      completada: true,
      servicioId: 1,
      responsableId: 1,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-05'),
    },
    {
      id: 2,
      titulo: 'Análisis de procesos',
      descripcion: 'Mapeo de flujos actuales',
      fechaVencimiento: new Date('2024-02-20'),
      prioridad: 'alta',
      completada: false,
      servicioId: 1,
      responsableId: 2,
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
    {
      id: 3,
      titulo: 'Preparar capacitación',
      descripcion: 'Material y presentaciones',
      fechaVencimiento: new Date('2024-03-01'),
      prioridad: 'media',
      completada: false,
      servicioId: 2,
      responsableId: 2,
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
  ],
  suscripciones: [
    {
      id: 1,
      clienteId: 1,
      nombre: 'Acompañamiento Mensual',
      descripcion: 'Soporte y asesoría mensual',
      valor: 500000,
      frecuencia: 'mensual',
      fechaInicio: new Date('2024-01-15'),
      fechaRenovacion: new Date('2024-02-15'),
      estado: 'activa',
      pago: 'pagado',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
    },
    {
      id: 2,
      clienteId: 2,
      nombre: 'Plan Trimestral',
      descripcion: 'Consultoría trimestral completa',
      valor: 2000000,
      frecuencia: 'trimestral',
      fechaInicio: new Date('2024-01-01'),
      fechaRenovacion: new Date('2024-04-01'),
      estado: 'activa',
      pago: 'pagado',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
  eventos: [
    {
      id: 1,
      titulo: 'Charla: Transformación Digital',
      descripcion: 'Conferencia sobre transformación digital en empresas',
      tipo: 'charla',
      fechaInicio: new Date('2024-03-15T10:00:00'),
      fechaFin: new Date('2024-03-15T12:00:00'),
      ubicacion: 'Auditorio Principal',
      cuposDisponibles: 100,
      cuposOcupados: 35,
      inscriptos: [
        {
          id: 1,
          nombre: 'Pedro Rodríguez',
          email: 'pedro@email.com',
          telefono: '3101234567',
          fechaInscripcion: new Date('2024-03-01'),
        },
        {
          id: 2,
          nombre: 'Ana García',
          email: 'ana@email.com',
          telefono: '3109876543',
          fechaInscripcion: new Date('2024-03-02'),
        },
      ],
      estado: 'confirmado',
      organizadorId: 1,
      enlaceZoom: 'https://zoom.us/j/123456789',
      materialUrl: 'https://drive.google.com/...',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
    {
      id: 2,
      titulo: 'Taller: Mejora de Procesos',
      descripcion: 'Taller práctico sobre optimización de procesos',
      tipo: 'taller',
      fechaInicio: new Date('2024-03-22T14:00:00'),
      fechaFin: new Date('2024-03-22T17:00:00'),
      ubicacion: 'Sala de Capacitación A',
      cuposDisponibles: 30,
      cuposOcupados: 28,
      inscriptos: [],
      estado: 'planificado',
      organizadorId: 2,
      enlaceZoom: 'https://zoom.us/j/987654321',
      materialUrl: null,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
    },
  ],
  oportunidades: [
    {
      id: 1,
      titulo: 'Proyecto Transformación Digital',
      descripcion: 'Implementación de plataforma digital para ACME',
      clienteId: 1,
      responsableId: 1,
      etapa: 'propuesta',
      valor: 15000000,
      probabilidad: 60,
      fechaEstimada: new Date('2024-05-01'),
      notas: 'Cliente interesado, en revisión de propuesta',
      prioridad: 'alta',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-20'),
    },
    {
      id: 2,
      titulo: 'Consultoría Eficiencia',
      descripcion: 'Diagnóstico y mejora de eficiencia para MegaStore',
      clienteId: 2,
      responsableId: 2,
      etapa: 'contacto',
      valor: 8000000,
      probabilidad: 30,
      fechaEstimada: new Date('2024-06-01'),
      notas: 'Primera reunión agendada',
      prioridad: 'media',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
    {
      id: 3,
      titulo: 'Capacitación ISO',
      descripcion: 'Capacitación en normativa ISO para InnovaTech',
      clienteId: 3,
      responsableId: 1,
      etapa: 'negociacion',
      valor: 5000000,
      probabilidad: 75,
      fechaEstimada: new Date('2024-04-15'),
      notas: 'En negociación de detalles',
      prioridad: 'media',
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-18'),
    },
  ],
  documentos: [
    {
      id: 1,
      tipo: 'Propuesta',
      urlArchivo: 'https://storage.com/propuesta-acme.pdf',
      nombre: 'Propuesta ACME.pdf',
      tamano: 2048000,
      clienteId: 1,
      servicioId: 1,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
    },
  ],
};

// Contadores para IDs
let idCounters = {
  usuarios: 4,
  clientes: 4,
  servicios: 4,
  tareas: 4,
  suscripciones: 3,
  eventos: 3,
  oportunidades: 4,
  documentos: 2,
};

// Utilidades
function getNewId(entity) {
  if (!idCounters[entity]) idCounters[entity] = 1;
  return ++idCounters[entity];
}

function findById(entity, id) {
  return mockData[entity].find((item) => item.id === id);
}

function findAllByField(entity, field, value) {
  return mockData[entity].filter((item) => item[field] === value);
}

function addItem(entity, item) {
  item.id = getNewId(entity);
  item.createdAt = new Date();
  item.updatedAt = new Date();
  mockData[entity].push(item);
  return item;
}

function updateItem(entity, id, updates) {
  const item = findById(entity, id);
  if (!item) return null;
  Object.assign(item, updates, { updatedAt: new Date() });
  return item;
}

function deleteItem(entity, id) {
  const index = mockData[entity].findIndex((item) => item.id === id);
  if (index === -1) return false;
  mockData[entity].splice(index, 1);
  return true;
}

module.exports = {
  mockData,
  getNewId,
  findById,
  findAllByField,
  addItem,
  updateItem,
  deleteItem,
};
