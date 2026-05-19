const express = require('express');
const authRoutes = require('./auth');
const clienteRoutes = require('./clientes');
const servicioRoutes = require('./servicios');
const calendarioRoutes = require('./calendario');
const usuarioRoutes = require('./usuarios');
const dashboardRoutes = require('./dashboard');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/servicios', servicioRoutes);
router.use('/calendario', calendarioRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
