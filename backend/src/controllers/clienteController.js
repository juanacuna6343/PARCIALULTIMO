const { Cliente } = require('../models');

async function listClientes(req, res, next) {
  try {
    const clientes = await Cliente.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: clientes });
  } catch (error) {
    next(error);
  }
}

async function getCliente(req, res, next) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
    }
    res.json({ success: true, data: cliente });
  } catch (error) {
    next(error);
  }
}

async function createCliente(req, res, next) {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json({ success: true, data: cliente, message: 'Cliente creado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function updateCliente(req, res, next) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
    }
    await cliente.update(req.body);
    res.json({ success: true, data: cliente, message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
}

async function deleteCliente(req, res, next) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
    }
    await cliente.destroy();
    res.json({ success: true, message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente
};
