const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

async function listUsuarios(req, res, next) {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'email', 'nombre', 'rol', 'activo', 'createdAt'], order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: usuarios });
  } catch (error) {
    next(error);
  }
}

async function createUsuario(req, res, next) {
  try {
    const password = await bcrypt.hash(req.body.password || '123456', 10);
    const usuario = await Usuario.create({ ...req.body, password });
    res.status(201).json({ success: true, data: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol, activo: usuario.activo }, message: 'Usuario creado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function updateUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado' } });
    }
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    await usuario.update(updates);
    res.json({ success: true, data: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol, activo: usuario.activo }, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function deleteUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado' } });
    }
    await usuario.update({ activo: false });
    res.json({ success: true, message: 'Usuario desactivado exitosamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
