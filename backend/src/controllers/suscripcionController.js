const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');

exports.listSuscripciones = (req, res) => {
  try {
    const suscripciones = mockData.suscripciones.map((s) => ({
      ...s,
      cliente: mockData.clientes.find((c) => c.id === s.clienteId),
    }));
    res.json({ success: true, data: suscripciones });
  } catch (error) {
    console.error('❌ Error listando suscripciones:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getSuscripcion = (req, res) => {
  try {
    const suscripcion = findById('suscripciones', parseInt(req.params.id));
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }
    const data = {
      ...suscripcion,
      cliente: mockData.clientes.find((c) => c.id === suscripcion.clienteId),
    };
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error obteniendo suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createSuscripcion = (req, res) => {
  try {
    const { clienteId, nombre, descripcion, valor, frecuencia, fechaInicio, estado, pago } = req.body;

    if (!clienteId || !nombre || !frecuencia) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'clienteId, nombre y frecuencia son requeridos' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const fechaRenovacion = new Date(fechaInicio || new Date());
    if (frecuencia === 'mensual') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
    else if (frecuencia === 'trimestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
    else if (frecuencia === 'semestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
    else if (frecuencia === 'anual') fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

    const suscripcion = addItem('suscripciones', {
      clienteId,
      nombre,
      descripcion: descripcion || '',
      valor: valor || 0,
      frecuencia,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
      fechaRenovacion,
      estado: estado || 'activa',
      pago: pago || 'pendiente',
    });

    res.status(201).json({ success: true, data: { ...suscripcion, cliente }, message: 'Suscripción creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateSuscripcion = (req, res) => {
  try {
    const suscripcion = findById('suscripciones', parseInt(req.params.id));
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    const actualizada = updateItem('suscripciones', parseInt(req.params.id), req.body);
    const cliente = mockData.clientes.find((c) => c.id === actualizada.clienteId);
    res.json({ success: true, data: { ...actualizada, cliente }, message: 'Suscripción actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteSuscripcion = (req, res) => {
  try {
    const suscripcion = findById('suscripciones', parseInt(req.params.id));
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    deleteItem('suscripciones', parseInt(req.params.id));
    res.json({ success: true, message: 'Suscripción eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.renovarSuscripcion = (req, res) => {
  try {
    const suscripcion = findById('suscripciones', parseInt(req.params.id));
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    const fechaRenovacion = new Date(suscripcion.fechaRenovacion);
    if (suscripcion.frecuencia === 'mensual') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
    else if (suscripcion.frecuencia === 'trimestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
    else if (suscripcion.frecuencia === 'semestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
    else if (suscripcion.frecuencia === 'anual') fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

    const actualizada = updateItem('suscripciones', parseInt(req.params.id), {
      fechaRenovacion,
      estado: 'activa',
      pago: 'pagado',
    });

    const cliente = mockData.clientes.find((c) => c.id === actualizada.clienteId);
    res.json({ success: true, data: { ...actualizada, cliente }, message: 'Suscripción renovada exitosamente' });
  } catch (error) {
    console.error('❌ Error renovando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
