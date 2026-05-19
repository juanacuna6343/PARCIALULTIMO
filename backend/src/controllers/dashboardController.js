const { Cliente, Servicio, Tarea, Usuario } = require('../models');

async function getDashboard(req, res, next) {
  try {
    const clientes = await Cliente.count();
    const servicios = await Servicio.count();
    const tareasPendientes = await Tarea.count({ where: { completada: false } });
    const usuarios = await Usuario.count({ where: { activo: true } });

    res.json({ success: true, data: { clientes, servicios, tareasPendientes, usuarios } });
  } catch (error) {
    next(error);
  }
}

async function getKpis(req, res, next) {
  try {
    const serviciosPorEstado = await Servicio.findAll({ attributes: ['estado', [Servicio.sequelize.fn('COUNT', Servicio.sequelize.col('id')), 'cantidad']], group: ['estado'] });
    res.json({ success: true, data: { serviciosPorEstado } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboard,
  getKpis
};
