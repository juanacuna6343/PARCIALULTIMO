const { Servicio, Cliente, Tarea } = require('../models');

async function listServicios(req, res, next) {
  try {
    const servicios = await Servicio.findAll({ include: [{ model: Cliente, as: 'cliente' }], order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: servicios });
  } catch (error) {
    next(error);
  }
}

async function createServicio(req, res, next) {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json({ success: true, data: servicio, message: 'Servicio creado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function updateServicio(req, res, next) {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Servicio no encontrado' } });
    }
    await servicio.update(req.body);
    res.json({ success: true, data: servicio, message: 'Servicio actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function listHitos(req, res, next) {
  try {
    const tareas = await Tarea.findAll({ where: { servicioId: req.params.id }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: tareas });
  } catch (error) {
    next(error);
  }
}

async function addHito(req, res, next) {
  try {
    const tarea = await Tarea.create({ servicioId: req.params.id, ...req.body });
    res.status(201).json({ success: true, data: tarea, message: 'Hito agregado exitosamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listServicios,
  createServicio,
  updateServicio,
  listHitos,
  addHito
};
