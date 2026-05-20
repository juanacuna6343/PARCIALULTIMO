const { mockData, addItem, findById, updateItem, deleteItem, findAllByField } = require('../mockData');

exports.listServicios = (req, res) => {
  try {
    const servicios = mockData.servicios.map((s) => {
      const cliente = mockData.clientes.find((c) => c.id === s.clienteId);
      return {
        id: s.id,
        nombre: s.tipo,
        descripcion: s.descripcion,
        clienteId: s.clienteId,
        clienteNombre: cliente?.nombre,
        estado: s.estado,
        precio: s.valor,
        fechaInicio: s.fechaInicio?.toISOString() || new Date().toISOString(),
        fechaFin: s.fechaFin?.toISOString(),
        notas: s.descripcion,
        createdAt: s.createdAt?.toISOString(),
        updatedAt: s.updatedAt?.toISOString(),
      };
    });
    res.json({ success: true, data: servicios });
  } catch (error) {
    console.error('❌ Error listando servicios:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createServicio = (req, res) => {
  try {
    const { nombre, clienteId, fechaInicio, fechaFin, precio, estado, descripcion } = req.body;

    if (!nombre || !clienteId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y clienteId son requeridos' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const servicio = addItem('servicios', {
      tipo: nombre,
      clienteId,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
      fechaFin: fechaFin ? new Date(fechaFin) : null,
      valor: precio || 0,
      estado: estado || 'pendiente',
      descripcion: descripcion || '',
    });

    const response = {
      id: servicio.id,
      nombre: servicio.tipo,
      descripcion: servicio.descripcion,
      clienteId: servicio.clienteId,
      clienteNombre: cliente?.nombre,
      estado: servicio.estado,
      precio: servicio.valor,
      fechaInicio: servicio.fechaInicio?.toISOString(),
      fechaFin: servicio.fechaFin?.toISOString(),
      notas: servicio.descripcion,
      createdAt: servicio.createdAt?.toISOString(),
      updatedAt: servicio.updatedAt?.toISOString(),
    };

    res.status(201).json({ success: true, data: response, message: 'Servicio creado exitosamente' });
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

    const updateData = { ...req.body };
    if (updateData.nombre) updateData.tipo = updateData.nombre;
    if (updateData.precio) updateData.valor = updateData.precio;
    delete updateData.nombre;
    delete updateData.precio;

    const actualizado = updateItem('servicios', parseInt(req.params.id), updateData);
    const cliente = findById('clientes', actualizado.clienteId);

    const response = {
      id: actualizado.id,
      nombre: actualizado.tipo,
      descripcion: actualizado.descripcion,
      clienteId: actualizado.clienteId,
      clienteNombre: cliente?.nombre,
      estado: actualizado.estado,
      precio: actualizado.valor,
      fechaInicio: actualizado.fechaInicio?.toISOString(),
      fechaFin: actualizado.fechaFin?.toISOString(),
      notas: actualizado.descripcion,
      createdAt: actualizado.createdAt?.toISOString(),
      updatedAt: actualizado.updatedAt?.toISOString(),
    };

    res.json({ success: true, data: response, message: 'Servicio actualizado exitosamente' });
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
