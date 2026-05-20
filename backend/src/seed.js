const bcrypt = require('bcryptjs');
const { sequelize, Usuario, Cliente, Servicio, Suscripcion, Evento, Oportunidad } = require('./models');
const env = require('./config/env');

async function seed() {
  try {
    console.log('🌱 Iniciando seed de datos...');
    
    // Sincronizar base de datos
    await sequelize.sync({ force: env.nodeEnv !== 'production' });
    console.log('✓ Base de datos sincronizada');

    // Verificar si ya hay datos
    const usuarioExistente = await Usuario.findOne({ where: { email: 'admin@sgdi.local' } });
    if (usuarioExistente) {
      console.log('✓ Datos ya existen, saltando seed');
      return;
    }

    // Crear usuarios secuencialmente
    const usuarioAdmin = await Usuario.create({
      email: 'admin@sgdi.local',
      password: await bcrypt.hash('Admin123!', 10),
      nombre: 'Administrador SGDI',
      rol: 'admin',
      activo: true
    });

    const usuarioUsuario = await Usuario.create({
      email: 'user@sgdi.local',
      password: await bcrypt.hash('User123!', 10),
      nombre: 'Usuario Demo',
      rol: 'usuario',
      activo: true
    });

    console.log('✓ Usuarios creados');

    // Crear clientes secuencialmente
    const cliente1 = await Cliente.create({
      nombre: 'ACME Corporation',
      contacto: 'Juan Pérez',
      email: 'contacto@acme.com',
      telefono: '+57 1 234 5678',
      sector: 'Tecnología',
      estado: 'activo'
    });

    const cliente2 = await Cliente.create({
      nombre: 'MegaStore S.A.',
      contacto: 'María García',
      email: 'info@megastore.com',
      telefono: '+57 1 987 6543',
      sector: 'Retail',
      estado: 'activo'
    });

    const cliente3 = await Cliente.create({
      nombre: 'InnovaTech Solutions',
      contacto: 'Carlos López',
      email: 'contacto@innovatech.co',
      telefono: '+57 1 456 7890',
      sector: 'Consultoría',
      estado: 'activo'
    });

    console.log('✓ Clientes creados');

    // Crear servicios
    const servicio1 = await Servicio.create({
      tipo: 'Diagnóstico Organizacional',
      clienteId: cliente1.id,
      fechaInicio: new Date(),
      fechaFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      valor: 5000000,
      estado: 'en_progreso',
      descripcion: 'Análisis profundo de la organización'
    });

    const servicio2 = await Servicio.create({
      tipo: 'Capacitación en Procesos',
      clienteId: cliente2.id,
      fechaInicio: new Date(),
      fechaFin: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      valor: 3500000,
      estado: 'pendiente',
      descripcion: 'Formación en mejora de procesos'
    });

    console.log('✓ Servicios creados');

    // Crear suscripción
    await Suscripcion.create({
      nombre: 'Acompañamiento Mensual',
      clienteId: cliente3.id,
      valor: 1000000,
      frecuencia: 'mensual',
      fechaInicio: new Date(),
      fechaRenovacion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      estado: 'activa',
      pago: 'pagado',
      descripcion: 'Asesoramiento mensual continuo'
    });

    console.log('✓ Suscripciones creadas');

    // Crear evento
    await Evento.create({
      titulo: 'Charla: Transformación Digital',
      descripcion: 'Conferencia sobre transformación digital en empresas',
      tipo: 'charla',
      fechaInicio: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      fechaFin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      ubicacion: 'Sala de Conferencias A',
      cuposDisponibles: 100,
      cuposOcupados: 0,
      estado: 'confirmado',
      organizadorId: usuarioAdmin.id,
      enlaceZoom: 'https://zoom.us/j/123456789'
    });

    console.log('✓ Eventos creados');

    // Crear oportunidades
    await Oportunidad.create({
      titulo: 'Proyecto Transformación Empresa X',
      descripcion: 'Proyecto grande de transformación organizacional',
      clienteId: cliente1.id,
      responsableId: usuarioAdmin.id,
      etapa: 'propuesta',
      valor: 15000000,
      probabilidad: 60,
      fechaEstimada: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      prioridad: 'alta'
    });

    await Oportunidad.create({
      titulo: 'Consultoría de Eficiencia',
      descripcion: 'Mejora de procesos en área operativa',
      clienteId: cliente2.id,
      responsableId: usuarioUsuario.id,
      etapa: 'contacto',
      valor: 8000000,
      probabilidad: 30,
      fechaEstimada: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      prioridad: 'media'
    });

    console.log('✓ Oportunidades creadas');
    
    console.log('✅ Seed completado exitosamente');
    console.log('\n📋 Credenciales de prueba:');
    console.log('   Email: admin@sgdi.local');
    console.log('   Contraseña: Admin123!\n');
    console.log('   Email: user@sgdi.local');
    console.log('   Contraseña: User123!\n');
    
  } catch (error) {
    console.error('❌ Error en seed:', error);
    // No salir del proceso, permitir que el servidor inicie
  }
}

module.exports = seed;

