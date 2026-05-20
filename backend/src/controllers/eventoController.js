const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');

exports.listEventos = (req, res) => {
  try {
    const eventos = mockData.eventos
      .map((e) => ({
        ...e,
        organizador: mockData.usuarios.find((u) => u.id === e.organizadorId),
      }))
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    res.json({ success: true, data: eventos });
  } catch (error) {
    console.error('❌ Error listando eventos:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getEvento = (req, res) => {
  try {
    const evento = findById('eventos', parseInt(req.params.id));
    if (!evento) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });
    }
    const data = {
      ...evento,
      organizador: mockData.usuarios.find((u) => u.id === evento.organizadorId),
    };
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error obteniendo evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createEvento = (req, res) => {
  try {
    const { titulo, descripcion, tipo, fechaInicio, fechaFin, ubicacion, cuposDisponibles, estado, enlaceZoom, materialUrl } = req.body;

    if (!titulo || !fechaInicio) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y fechaInicio son requeridos' });
    }

    const evento = addItem('eventos', {
      titulo,
      descripcion: descripcion || '',
      tipo: tipo || 'charla',
      fechaInicio: new Date(fechaInicio),
      fechaFin: fechaFin ? new Date(fechaFin) : null,
      ubicacion: ubicacion || '',
      cuposDisponibles: cuposDisponibles || 0,
      cuposOcupados: 0,
      inscriptos: [],
      estado: estado || 'planificado',
      organizadorId: req.user?.userId || 1,
      enlaceZoom: enlaceZoom || null,
      materialUrl: materialUrl || null,
    });

    const organizador = mockData.usuarios.find((u) => u.id === evento.organizadorId);
    res.status(201).json({ success: true, data: { ...evento, organizador }, message: 'Evento creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateEvento = (req, res) => {
  try {
    const evento = findById('eventos', parseInt(req.params.id));
    if (!evento) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });
    }

    const actualizado = updateItem('eventos', parseInt(req.params.id), req.body);
    const organizador = mockData.usuarios.find((u) => u.id === actualizado.organizadorId);
    res.json({ success: true, data: { ...actualizado, organizador }, message: 'Evento actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteEvento = (req, res) => {
  try {
    const evento = findById('eventos', parseInt(req.params.id));
    if (!evento) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });
    }

    deleteItem('eventos', parseInt(req.params.id));
    res.json({ success: true, message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.inscribirEvento = (req, res) => {
  try {
    const evento = findById('eventos', parseInt(req.params.id));
    if (!evento) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });
    }

    const { nombre, email, telefono } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y email son requeridos' });
    }

    if (evento.cuposOcupados >= evento.cuposDisponibles) {
      return res.status(400).json({ code: 'NO_CUPOS', message: 'No hay cupos disponibles' });
    }

    const inscripto = {
      id: evento.inscriptos.length + 1,
      nombre,
      email,
      telefono: telefono || '',
      fechaInscripcion: new Date(),
    };

    evento.inscriptos.push(inscripto);
    evento.cuposOcupados++;
    updateItem('eventos', parseInt(req.params.id), evento);

    res.status(201).json({ success: true, data: { ...evento, message: 'Inscripción realizada exitosamente' } });
  } catch (error) {
    console.error('❌ Error inscribiendo en evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.desinscribirEvento = (req, res) => {
  try {
    const evento = findById('eventos', parseInt(req.params.id));
    if (!evento) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });
    }

    const { inscriptoId } = req.body;
    const index = evento.inscriptos.findIndex((i) => i.id === inscriptoId);

    if (index === -1) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Inscripción no encontrada' });
    }

    evento.inscriptos.splice(index, 1);
    evento.cuposOcupados--;
    updateItem('eventos', parseInt(req.params.id), evento);

    res.json({ success: true, data: { ...evento, message: 'Desinscripción realizada exitosamente' } });
  } catch (error) {
    console.error('❌ Error desinscribiendo de evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
