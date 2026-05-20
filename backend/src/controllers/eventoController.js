const { supabase } = require('../lib/supabase');

const { findById: findByIdMock } = require('../mockData');

const serializeEvento = (evento) => {
  if (!evento) return null;
  return {
    id: evento.id,
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    tipo: evento.tipo,
    estado: evento.estado,
    fechaInicio: evento.fecha_inicio,
    fechaFin: evento.fecha_fin,
    ubicacion: evento.ubicacion,
    cuposDisponibles: evento.cupos_disponibles,
    cuposOcupados: evento.cupos_ocupados,
    inscriptos: evento.inscriptos,
    organizadorId: evento.organizador_id,
    enlaceZoom: evento.enlace_zoom,
    materialUrl: evento.material_url,
    createdAt: evento.created_at,
    updatedAt: evento.updated_at,
    organizador: evento.organizador ? {
      id: evento.organizador.id,
      nombre: evento.organizador.nombre,
    } : null,
  }
}

exports.listEventos = async (req, res) => {
  try {
    const { data: eventos, error } = await supabase
      .from('eventos')
      .select('*')
      .order('fecha_inicio', { ascending: true });

    if (error) throw error;

    const organizadorIds = [...new Set((eventos || []).map((e) => e.organizador_id).filter(Boolean))];
    const { data: usuarios } = organizadorIds.length
      ? await supabase.from('usuarios').select('id,nombre').in('id', organizadorIds)
      : { data: [] };

    const mapped = (eventos || []).map((e) => serializeEvento({
      ...e,
      organizador: usuarios?.find((u) => u.id === e.organizador_id) || null,
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('❌ Error listando eventos:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: evento, error } = await supabase.from('eventos').select('*').eq('id', id).single();
    if (error || !evento) return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });

    const { data: organizador } = await supabase.from('usuarios').select('id,nombre').eq('id', evento.organizador_id).single();
    res.json({ success: true, data: serializeEvento({ ...evento, organizador }) });
  } catch (error) {
    console.error('❌ Error obteniendo evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createEvento = async (req, res) => {
  try {
    const { titulo, descripcion, tipo, fechaInicio, fechaFin, ubicacion, cuposDisponibles, estado, enlaceZoom, materialUrl } = req.body;

    if (!titulo || !fechaInicio) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y fechaInicio son requeridos' });
    }

    const { data: evento, error } = await supabase.from('eventos').insert([
      {
        titulo,
        descripcion: descripcion || '',
        tipo: tipo || 'charla',
        fecha_inicio: new Date(fechaInicio),
        fecha_fin: fechaFin ? new Date(fechaFin) : null,
        ubicacion: ubicacion || '',
        cupos_disponibles: cuposDisponibles || 0,
        cupos_ocupados: 0,
        inscriptos: [],
        estado: estado || 'planificado',
        organizador_id: req.user?.userId || 1,
        enlace_zoom: enlaceZoom || null,
        material_url: materialUrl || null,
      }
    ]).select().single();

    if (error) throw error;
    const { data: organizador } = await supabase.from('usuarios').select('id,nombre').eq('id', evento.organizador_id).single();
    res.status(201).json({ success: true, data: serializeEvento({ ...evento, organizador }), message: 'Evento creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('eventos').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });

    const { data: actualizado, error } = await supabase.from('eventos').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    const { data: organizador } = await supabase.from('usuarios').select('id,nombre').eq('id', actualizado.organizador_id).single();
    res.json({ success: true, data: serializeEvento({ ...actualizado, organizador }), message: 'Evento actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('eventos').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });

    const { error } = await supabase.from('eventos').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.inscribirEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: evento, error: getError } = await supabase.from('eventos').select('*').eq('id', id).single();
    if (getError || !evento) return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });

    const { nombre, email, telefono } = req.body;
    if (!nombre || !email) return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y email son requeridos' });

    if (evento.cupos_ocupados >= evento.cupos_disponibles) {
      return res.status(400).json({ code: 'NO_CUPOS', message: 'No hay cupos disponibles' });
    }

    const inscriptos = Array.isArray(evento.inscriptos) ? evento.inscriptos : [];
    const inscripto = {
      id: (inscriptos.length ? Math.max(...inscriptos.map((i) => i.id || 0)) : 0) + 1,
      nombre,
      email,
      telefono: telefono || '',
      fechaInscripcion: new Date(),
    };

    inscriptos.push(inscripto);
    const { data: actualizado, error } = await supabase.from('eventos').update({ inscriptos, cupos_ocupados: (evento.cupos_ocupados || 0) + 1 }).eq('id', id).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data: serializeEvento(actualizado), message: 'Inscripción realizada exitosamente' });
  } catch (error) {
    console.error('❌ Error inscribiendo en evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.desinscribirEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: evento, error: getError } = await supabase.from('eventos').select('*').eq('id', id).single();
    if (getError || !evento) return res.status(404).json({ code: 'NOT_FOUND', message: 'Evento no encontrado' });

    const { inscriptoId } = req.body;
    const inscriptos = Array.isArray(evento.inscriptos) ? evento.inscriptos : [];
    const index = inscriptos.findIndex((i) => i.id === inscriptoId);
    if (index === -1) return res.status(404).json({ code: 'NOT_FOUND', message: 'Inscripción no encontrada' });

    inscriptos.splice(index, 1);
    const { data: actualizado, error } = await supabase.from('eventos').update({ inscriptos, cupos_ocupados: Math.max(0, (evento.cupos_ocupados || 0) - 1) }).eq('id', id).select().single();
    if (error) throw error;
    res.json({ success: true, data: serializeEvento(actualizado), message: 'Desinscripción realizada exitosamente' });
  } catch (error) {
    console.error('❌ Error desinscribiendo de evento:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
