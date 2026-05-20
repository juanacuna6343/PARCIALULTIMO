const { mockData, addItem, findById, updateItem, deleteItem, findAllByField } = require('../mockData');

exports.listServicios = (req, res) => {
  try {
    const servicios = mockData.servicios.map((s) => ({
      ...s,
      cliente: mockData.clientes.find((c) => c.id === s.clienteId),
    }));
    res.json({ success: true, data: servicios });
  } catch (error) {
    console.error('❌ Error listando servicios:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createServicio = (req, res) => {
  try {
    const { tipo, clienteId, fechaInicio, fechaFin, valor, estado, descripcion } = req.body;

    if (!tipo || !clienteId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Tipo y clienteId son requeridos' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const servicio = addItem('servicios', {
      tipo,
      clienteId,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
      fechaFin: fechaFin ? new Date(fechaFin) : null,
      valor: valor || 0,
      estado: estado || 'pendiente',
      descripcion: descripcion || '',
    });

    res.status(201).json({ success: true, data: { ...servicio, cliente }, message: 'Servicio creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando servicio:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateServicio = (req, res) => {
  try {
    const servicio = findById('servicios', parseInt(req.params.id));
    if (!servicio) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
    }

    const actualizado = updateItem('servicios', parseInt(req.params.id), req.body);
    const cliente = findById('clientes', actualizado.clienteId);
    res.json({ success: true, data: { ...actualizado, cliente }, message: 'Servicio actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando servicio:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.listHitos = (req, res) => {
  try {
    const tareas = findAllByField('tareas', 'servicioId', parseInt(req.params.id));
    res.json({ success: true, data: tareas });
  } catch (error) {
    console.error('❌ Error listando hitos:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.addHito = (req, res) => {
  try {
    const servicio = findById('servicios', parseInt(req.params.id));
    if (!servicio) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
    }

    const { titulo, descripcion, fechaVencimiento, prioridad, responsableId } = req.body;

    if (!titulo) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título es requerido' });
    }

    const tarea = addItem('tareas', {
      titulo,
      descripcion: descripcion || '',
      fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
      prioridad: prioridad || 'media',
      completada: false,
      servicioId: parseInt(req.params.id),
      responsableId: responsableId || null,
    });

    res.status(201).json({ success: true, data: tarea, message: 'Hito agregado exitosamente' });
  } catch (error) {
    console.error('❌ Error agregando hito:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
