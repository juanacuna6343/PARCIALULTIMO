const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');

exports.listClientes = (req, res) => {
  try {
    const clientes = [...mockData.clientes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: clientes });
  } catch (error) {
    console.error('❌ Error listando clientes:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getCliente = (req, res) => {
  try {
    const cliente = findById('clientes', parseInt(req.params.id));
    if (!cliente) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
    }
    res.json({ success: true, data: cliente });
  } catch (error) {
    console.error('❌ Error obteniendo cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createCliente = (req, res) => {
  try {
    const { nombre, contacto, email, telefono, sector } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y email son requeridos' });
    }

    const existe = mockData.clientes.find((c) => c.email === email);
    if (existe) {
      return res.status(409).json({ code: 'UNIQUE_CONSTRAINT', message: 'Email ya existe' });
    }

    const cliente = addItem('clientes', {
      nombre,
      contacto: contacto || '',
      email,
      telefono: telefono || '',
      sector: sector || '',
      estado: 'activo',
    });

    res.status(201).json({ success: true, data: cliente, message: 'Cliente creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateCliente = (req, res) => {
  try {
    const cliente = findById('clientes', parseInt(req.params.id));
    if (!cliente) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
    }

    const actualizado = updateItem('clientes', parseInt(req.params.id), req.body);
    res.json({ success: true, data: actualizado, message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteCliente = (req, res) => {
  try {
    const cliente = findById('clientes', parseInt(req.params.id));
    if (!cliente) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
    }

    deleteItem('clientes', parseInt(req.params.id));
    res.json({ success: true, message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
