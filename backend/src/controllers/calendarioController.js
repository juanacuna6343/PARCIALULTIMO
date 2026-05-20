const { supabase } = require('../lib/supabase');

const { findById: findByIdMock } = require('../mockData');

exports.listTareas = async (req, res) => {
  try {
    const { data: tareas, error } = await supabase
      .from('tareas')
      .select('*')
      .order('fecha_vencimiento', { ascending: true });

    if (error) throw error;

    // Fetch servicios and usuarios to attach minimal info
    const servicioIds = [...new Set((tareas || []).map((t) => t.servicio_id).filter(Boolean))];
    const responsableIds = [...new Set((tareas || []).map((t) => t.responsable_id).filter(Boolean))];

    const { data: servicios } = servicioIds.length
      ? await supabase.from('servicios').select('id,tipo').in('id', servicioIds)
      : { data: [] };

    const { data: usuarios } = responsableIds.length
      ? await supabase.from('usuarios').select('id,nombre').in('id', responsableIds)
      : { data: [] };

    const mapped = (tareas || []).map((t) => ({
      id: t.id,
      titulo: t.titulo,
      descripcion: t.descripcion,
      fechaVencimiento: t.fecha_vencimiento,
      prioridad: t.prioridad,
      completada: t.completada,
      servicioId: t.servicio_id,
      servicio: servicios?.find((s) => s.id === t.servicio_id) || null,
      responsableId: t.responsable_id,
      responsable: usuarios?.find((u) => u.id === t.responsable_id) || null,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('❌ Error listando tareas:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createTarea = async (req, res) => {
  try {
    const { titulo, descripcion, fechaVencimiento, prioridad, servicioId, responsableId } = req.body;

    if (!titulo || !servicioId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título y servicioId son requeridos' });
    }

    const { data: tarea, error } = await supabase
      .from('tareas')
      .insert([
        {
          titulo,
          descripcion: descripcion || '',
          fecha_vencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
          prioridad: prioridad || 'media',
          completada: false,
          servicio_id: servicioId,
          responsable_id: responsableId || null,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: tarea, message: 'Tarea creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('tareas').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Tarea no encontrada' });

    const { data: actualizado, error } = await supabase
      .from('tareas')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data: actualizado, message: 'Tarea actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.completarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: existing, error: getError } = await supabase.from('tareas').select('*').eq('id', id).single();
    if (getError || !existing) return res.status(404).json({ code: 'NOT_FOUND', message: 'Tarea no encontrada' });

    const { data: actualizado, error } = await supabase.from('tareas').update({ completada: true }).eq('id', id).select().single();
    if (error) throw error;
    res.json({ success: true, data: actualizado, message: 'Tarea marcada como completada' });
  } catch (error) {
    console.error('❌ Error completando tarea:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
