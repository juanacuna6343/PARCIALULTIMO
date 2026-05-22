const { supabase, supabaseConfigured } = require('../lib/supabase');
const { mockData, findById, addItem, updateItem, deleteItem, findAllByField } = require('../mockData');

const toOportunidadResponse = (oportunidad) => {
  const cliente = mockData.clientes.find((c) => c.id === (oportunidad.clienteId || oportunidad.cliente_id));
  const responsable = mockData.usuarios.find((u) => u.id === (oportunidad.responsableId || oportunidad.responsable_id));
  return {
    ...oportunidad,
    cliente,
    responsable,
  };
};

exports.listOportunidades = async (req, res) => {
  try {
    const { etapa } = req.query;

    if (supabaseConfigured && supabase) {
      let query = supabase.from('oportunidades').select('*');
      if (etapa) query = query.eq('etapa', etapa);
      const { data: oportunidades, error } = await query;
      if (error) throw error;

      const clienteIds = [...new Set((oportunidades || []).map((o) => o.cliente_id).filter(Boolean))];
      const responsableIds = [...new Set((oportunidades || []).map((o) => o.responsable_id).filter(Boolean))];

      const { data: clientes } = clienteIds.length ? await supabase.from('clientes').select('id,nombre').in('id', clienteIds) : { data: [] };
      const { data: usuarios } = responsableIds.length ? await supabase.from('usuarios').select('id,nombre').in('id', responsableIds) : { data: [] };

      const mapped = (oportunidades || []).map((o) => ({
        ...o,
        cliente: clientes?.find((c) => c.id === o.cliente_id) || null,
        responsable: usuarios?.find((u) => u.id === o.responsable_id) || null,
      }));

      mapped.sort((a, b) => {
        const prioridades = { alta: 3, media: 2, baja: 1 };
        return (prioridades[b.prioridad] || 0) - (prioridades[a.prioridad] || 0);
      });

      return res.json({ success: true, data: mapped });
    }

    let oportunidades = [...mockData.oportunidades];
    if (etapa) oportunidades = oportunidades.filter((o) => o.etapa === etapa);
    oportunidades.sort((a, b) => {
      const prioridades = { alta: 3, media: 2, baja: 1 };
      return (prioridades[b.prioridad] || 0) - (prioridades[a.prioridad] || 0);
    });
    res.json({ success: true, data: oportunidades.map(toOportunidadResponse) });
  } catch (error) {
    console.error('❌ Error listando oportunidades:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: oportunidad, error } = await supabase.from('oportunidades').select('*').eq('id', id).single();
      if (error || !oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

      const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', oportunidad.cliente_id).single();
      const { data: responsable } = oportunidad.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', oportunidad.responsable_id).single() : { data: null };
      return res.json({ success: true, data: { ...oportunidad, cliente, responsable } });
    }

    const oportunidad = findById('oportunidades', id);
    if (!oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });
    res.json({ success: true, data: toOportunidadResponse(oportunidad) });
  } catch (error) {
    console.error('❌ Error obteniendo oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createOportunidad = async (req, res) => {
  try {
    const { titulo, descripcion, clienteId, etapa, valor, probabilidad, fechaEstimada, notas, prioridad } = req.body;

    if (!titulo || !clienteId) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y clienteId son requeridos' });

    if (supabaseConfigured && supabase) {
      const { data: cliente } = await supabase.from('clientes').select('*').eq('id', clienteId).single();
      if (!cliente) return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });

      const { data: oportunidad, error } = await supabase.from('oportunidades').insert([
        {
          titulo,
          descripcion: descripcion || '',
          cliente_id: clienteId,
          responsable_id: req.user?.userId || 1,
          etapa: etapa || 'contacto',
          valor: valor || 0,
          probabilidad: probabilidad || 0,
          fecha_estimada: fechaEstimada ? new Date(fechaEstimada) : null,
          notas: notas || '',
          prioridad: prioridad || 'media',
        }
      ]).select().single();

      if (error) throw error;
      const { data: responsable } = oportunidad.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', oportunidad.responsable_id).single() : { data: null };
      return res.status(201).json({ success: true, data: { ...oportunidad, cliente, responsable }, message: 'Oportunidad creada exitosamente' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });

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

    res.status(201).json({ success: true, data: toOportunidadResponse(oportunidad), message: 'Oportunidad creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
      if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

      const { data: actualizado, error } = await supabase.from('oportunidades').update(req.body).eq('id', id).select().single();
      if (error) throw error;
      const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', actualizado.cliente_id).single();
      const { data: responsable } = actualizado.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', actualizado.responsable_id).single() : { data: null };
      return res.json({ success: true, data: { ...actualizado, cliente, responsable }, message: 'Oportunidad actualizada exitosamente' });
    }

    const oportunidad = findById('oportunidades', id);
    if (!oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const actualizado = updateItem('oportunidades', id, req.body);
    res.json({ success: true, data: toOportunidadResponse(actualizado), message: 'Oportunidad actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
      if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

      const { error } = await supabase.from('oportunidades').delete().eq('id', id);
      if (error) throw error;
      return res.json({ success: true, message: 'Oportunidad eliminada exitosamente' });
    }

    const oportunidad = findById('oportunidades', id);
    if (!oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    deleteItem('oportunidades', id);
    res.json({ success: true, message: 'Oportunidad eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.cambiarEtapa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { etapa } = req.body;
    const etapasValidas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];
    if (!etapasValidas.includes(etapa)) return res.status(400).json({ code: 'INVALID_ETAPA', message: 'Etapa inválida' });

    if (supabaseConfigured && supabase) {
      const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
      if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

      const { data: actualizada, error } = await supabase.from('oportunidades').update({ etapa }).eq('id', id).select().single();
      if (error) throw error;
      const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', actualizada.cliente_id).single();
      const { data: responsable } = actualizada.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', actualizada.responsable_id).single() : { data: null };
      return res.json({ success: true, data: { ...actualizada, cliente, responsable }, message: 'Etapa actualizada exitosamente' });
    }

    const oportunidad = findById('oportunidades', id);
    if (!oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const actualizada = updateItem('oportunidades', id, { etapa });
    res.json({ success: true, data: toOportunidadResponse(actualizada), message: 'Etapa actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error cambiando etapa:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getPipelineStats = async (req, res) => {
  try {
    const etapas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];
    const stats = {};

    if (supabaseConfigured && supabase) {
      for (const etapa of etapas) {
        const { data: oportunidadesEnEtapa, error } = await supabase.from('oportunidades').select('*').eq('etapa', etapa);
        if (error) throw error;
        stats[etapa] = {
          cantidad: (oportunidadesEnEtapa || []).length,
          valorTotal: (oportunidadesEnEtapa || []).reduce((sum, o) => sum + (Number(o.valor) || 0), 0),
        };
      }
    } else {
      for (const etapa of etapas) {
        const oportunidadesEnEtapa = findAllByField('oportunidades', 'etapa', etapa);
        stats[etapa] = {
          cantidad: oportunidadesEnEtapa.length,
          valorTotal: oportunidadesEnEtapa.reduce((sum, o) => sum + (Number(o.valor) || 0), 0),
        };
      }
    }

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('❌ Error obteniendo stats pipeline:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
