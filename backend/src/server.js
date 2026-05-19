const fs = require('fs');
const path = require('path');
const app = require('./app');
const env = require('./config/env');
const { sequelize, Usuario, Cliente, Servicio, Tarea } = require('./models');

async function seedInitialData() {
  const adminEmail = 'admin@sgdi.local';
  const existing = await Usuario.findOne({ where: { email: adminEmail } });
  if (!existing) {
    const bcrypt = require('bcryptjs');
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    await Usuario.create({ nombre: 'Administrador', email: adminEmail, password: adminPassword, rol: 'admin', activo: true });
  }

  const existingCliente = await Cliente.findOne();
  if (!existingCliente) {
    const cliente = await Cliente.create({ nombre: 'Cliente Demo', contacto: 'Brayan C.', email: 'cliente@demo.com', telefono: '+57 300 0000000', sector: 'Consultoría', estado: 'activo' });
    const servicio = await Servicio.create({ clienteId: cliente.id, tipo: 'Consultoría Estratégica', fechaInicio: new Date().toISOString().slice(0, 10), fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10), valor: 4500000, estado: 'en progreso', descripcion: 'Servicio inicial de consultoría.' });
    await Tarea.create({ servicioId: servicio.id, titulo: 'Reunión de kickoff', fechaVencimiento: new Date().toISOString().slice(0, 10), prioridad: 'alta', completada: false });
  }
}

async function ensureDataDirectory() {
  if (env.db.dialect === 'sqlite') {
    const dataDir = path.resolve(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }
}

async function start() {
  try {
    await ensureDataDirectory();
    await sequelize.sync({ alter: true });
    await seedInitialData();
    app.listen(env.port, () => {
      console.log(`SGDI backend escuchando en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

start();
