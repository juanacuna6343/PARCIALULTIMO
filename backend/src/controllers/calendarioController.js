const { mockData, addItem, findById, updateItem, findAllByField } = require('../mockData');

exports.listTareas = (req, res) => {
  try {
    const tareas = mockData.tareas
      .map((t) => ({
        ...t,
        servicio: mockData.servicios.find((s) => s.id === t.servicioId),
        responsable: mockData.usuarios.find((u) => u.id === t.responsableId),
      }))
      .sort((a, b) => new Date(a.fechaVencimiento || 0) - new Date(b.fechaVencimiento || 0));
    res.json({ success: true, data: tareas });
  } catch (error) {
    console.error('❌ Error listando tareas:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createTarea = (req, res) => {
  try {
    const { titulo, descripcion, fechaVencimiento, prioridad, servicioId, responsableId } = req.body;

    if (!titulo || !servicioId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y servicioId son requeridos' });
    }

    const tarea = addItem('tareas', {
      titulo,
      descripcion: descripcion || '',
      fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
      prioridad: prioridad || 'media',
      completada: false,
      servicioId,
      responsableId: responsableId || null,
    });

    res.status(201).json({ success: true, data: tarea, message: 'Tarea creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateTarea = (req, res) => {
  try {
    const tarea = findById('tareas', parseInt(req.params.id));
    if (!tarea) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Tarea no encontrada' });
    }

    const actualizada = updateItem('tareas', parseInt(req.params.id), req.body);
    res.json({ success: true, data: actualizada, message: 'Tarea actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.completarTarea = (req, res) => {
  try {
    const tarea = findById('tareas', parseInt(req.params.id));
    if (!tarea) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Tarea no encontrada' });
    }

    const actualizada = updateItem('tareas', parseInt(req.params.id), { completada: true });
    res.json({ success: true, data: actualizada, message: 'Tarea marcada como completada' });
  } catch (error) {
    console.error('❌ Error completando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
