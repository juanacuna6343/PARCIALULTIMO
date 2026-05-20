const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');

exports.listOportunidades = (req, res) => {
  try {
    const { etapa } = req.query;
    let oportunidades = mockData.oportunidades.map((o) => ({
      ...o,
      cliente: mockData.clientes.find((c) => c.id === o.clienteId),
      responsable: mockData.usuarios.find((u) => u.id === o.responsableId),
    }));

    if (etapa) {
      oportunidades = oportunidades.filter((o) => o.etapa === etapa);
    }

    oportunidades.sort((a, b) => {
      const prioridades = { alta: 3, media: 2, baja: 1 };
      return (prioridades[b.prioridad] || 0) - (prioridades[a.prioridad] || 0);
    });

    res.json({ success: true, data: oportunidades });
  } catch (error) {
    console.error('❌ Error listando oportunidades:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getOportunidad = (req, res) => {
  try {
    const oportunidad = findById('oportunidades', parseInt(req.params.id));
    if (!oportunidad) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });
    }

    const data = {
      ...oportunidad,
      cliente: mockData.clientes.find((c) => c.id === oportunidad.clienteId),
      responsable: mockData.usuarios.find((u) => u.id === oportunidad.responsableId),
    };
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error obteniendo oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createOportunidad = (req, res) => {
  try {
    const { titulo, descripcion, clienteId, etapa, valor, probabilidad, fechaEstimada, notas, prioridad } = req.body;

    if (!titulo || !clienteId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y clienteId son requeridos' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const oportunidad = addItem('oportunidades', {
      titulo,
      descripcion: descripcion || '',
      clienteId,
      responsableId: req.user?.userId || 1,
      etapa: etapa || 'contacto',
      valor: valor || 0,
      probabilidad: probabilidad || 0,
      fechaEstimada: fechaEstimada ? new Date(fechaEstimada) : null,
      notas: notas || '',
      prioridad: prioridad || 'media',
    });

    const clienteData = mockData.clientes.find((c) => c.id === oportunidad.clienteId);
    const responsableData = mockData.usuarios.find((u) => u.id === oportunidad.responsableId);
    res.status(201).json({ success: true, data: { ...oportunidad, cliente: clienteData, responsable: responsableData }, message: 'Oportunidad creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateOportunidad = (req, res) => {
  try {
    const oportunidad = findById('oportunidades', parseInt(req.params.id));
    if (!oportunidad) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });
    }

    const actualizada = updateItem('oportunidades', parseInt(req.params.id), req.body);
    const cliente = mockData.clientes.find((c) => c.id === actualizada.clienteId);
    const responsable = mockData.usuarios.find((u) => u.id === actualizada.responsableId);
    res.json({ success: true, data: { ...actualizada, cliente, responsable }, message: 'Oportunidad actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteOportunidad = (req, res) => {
  try {
    const oportunidad = findById('oportunidades', parseInt(req.params.id));
    if (!oportunidad) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });
    }

    deleteItem('oportunidades', parseInt(req.params.id));
    res.json({ success: true, message: 'Oportunidad eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.cambiarEtapa = (req, res) => {
  try {
    const oportunidad = findById('oportunidades', parseInt(req.params.id));
    if (!oportunidad) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });
    }

    const { etapa } = req.body;
    const etapasValidas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];

    if (!etapasValidas.includes(etapa)) {
      return res.status(400).json({ code: 'INVALID_ETAPA', message: 'Etapa inválida' });
    }

    const actualizada = updateItem('oportunidades', parseInt(req.params.id), { etapa });
    const cliente = mockData.clientes.find((c) => c.id === actualizada.clienteId);
    const responsable = mockData.usuarios.find((u) => u.id === actualizada.responsableId);
    res.json({ success: true, data: { ...actualizada, cliente, responsable }, message: 'Etapa actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error cambiando etapa:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getPipelineStats = (req, res) => {
  try {
    const stats = {};
    const etapas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];

    etapas.forEach((etapa) => {
      const oportunidadesEnEtapa = mockData.oportunidades.filter((o) => o.etapa === etapa);
      stats[etapa] = {
        cantidad: oportunidadesEnEtapa.length,
        valorTotal: oportunidadesEnEtapa.reduce((sum, o) => sum + (o.valor || 0), 0),
      };
    });

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('❌ Error obteniendo stats pipeline:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
