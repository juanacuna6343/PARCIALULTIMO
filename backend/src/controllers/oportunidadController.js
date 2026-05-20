const { supabase } = require('../lib/supabase');

const { findById: findByIdMock } = require('../mockData');

exports.listOportunidades = async (req, res) => {
  try {
    const { etapa } = req.query;
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

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('❌ Error listando oportunidades:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: oportunidad, error } = await supabase.from('oportunidades').select('*').eq('id', id).single();
    if (error || !oportunidad) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', oportunidad.cliente_id).single();
    const { data: responsable } = oportunidad.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', oportunidad.responsable_id).single() : { data: null };
    res.json({ success: true, data: { ...oportunidad, cliente, responsable } });
  } catch (error) {
    console.error('❌ Error obteniendo oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createOportunidad = async (req, res) => {
  try {
    const { titulo, descripcion, clienteId, etapa, valor, probabilidad, fechaEstimada, notas, prioridad } = req.body;

    if (!titulo || !clienteId) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y clienteId son requeridos' });

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
    res.status(201).json({ success: true, data: { ...oportunidad, cliente, responsable }, message: 'Oportunidad creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const { data: actualizado, error } = await supabase.from('oportunidades').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', actualizado.cliente_id).single();
    const { data: responsable } = actualizado.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', actualizado.responsable_id).single() : { data: null };
    res.json({ success: true, data: { ...actualizado, cliente, responsable }, message: 'Oportunidad actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteOportunidad = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const { error } = await supabase.from('oportunidades').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Oportunidad eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando oportunidad:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.cambiarEtapa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('oportunidades').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Oportunidad no encontrada' });

    const { etapa } = req.body;
    const etapasValidas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];
    if (!etapasValidas.includes(etapa)) return res.status(400).json({ code: 'INVALID_ETAPA', message: 'Etapa inválida' });

    const { data: actualizada, error } = await supabase.from('oportunidades').update({ etapa }).eq('id', id).select().single();
    if (error) throw error;
    const { data: cliente } = await supabase.from('clientes').select('id,nombre').eq('id', actualizada.cliente_id).single();
    const { data: responsable } = actualizada.responsable_id ? await supabase.from('usuarios').select('id,nombre').eq('id', actualizada.responsable_id).single() : { data: null };
    res.json({ success: true, data: { ...actualizada, cliente, responsable }, message: 'Etapa actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error cambiando etapa:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getPipelineStats = async (req, res) => {
  try {
    const stats = {};
    const etapas = ['contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'];

    for (const etapa of etapas) {
      const { data: oportunidadesEnEtapa, error } = await supabase.from('oportunidades').select('*').eq('etapa', etapa);
      if (error) throw error;
      stats[etapa] = {
        cantidad: (oportunidadesEnEtapa || []).length,
        valorTotal: (oportunidadesEnEtapa || []).reduce((sum, o) => sum + (Number(o.valor) || 0), 0),
      };
    }

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('❌ Error obteniendo stats pipeline:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
