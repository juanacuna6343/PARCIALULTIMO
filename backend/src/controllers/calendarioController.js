const { Tarea, Servicio, Usuario } = require('../models');

async function listTareas(req, res, next) {
  try {
    const tareas = await Tarea.findAll({ include: [{ model: Servicio, as: 'servicio' }, { model: Usuario, as: 'responsable' }], order: [['fechaVencimiento', 'ASC']] });
    res.json({ success: true, data: tareas });
  } catch (error) {
    next(error);
  }
}

async function createTarea(req, res, next) {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json({ success: true, data: tarea, message: 'Tarea creada exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function updateTarea(req, res, next) {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Tarea no encontrada' } });
    }
    await tarea.update(req.body);
    res.json({ success: true, data: tarea, message: 'Tarea actualizada exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function completarTarea(req, res, next) {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Tarea no encontrada' } });
    }
    await tarea.update({ completada: true });
    res.json({ success: true, data: tarea, message: 'Tarea marcada como completada' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listTareas,
  createTarea,
  updateTarea,
  completarTarea
};
