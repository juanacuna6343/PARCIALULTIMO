const express = require('express');
const authRoutes = require('./auth');
const clienteRoutes = require('./clientes');
const servicioRoutes = require('./servicios');
const calendarioRoutes = require('./calendario');
const usuarioRoutes = require('./usuarios');
const dashboardRoutes = require('./dashboard');
const suscripcionRoutes = require('./suscripciones');
const eventoRoutes = require('./eventos');
const pipelineRoutes = require('./pipeline');
const archivosRoutes = require('./archivos');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/servicios', servicioRoutes);
router.use('/calendario', calendarioRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/suscripciones', suscripcionRoutes);
router.use('/eventos', eventoRoutes);
router.use('/pipeline', pipelineRoutes);
router.use('/archivos', archivosRoutes);

module.exports = router;
