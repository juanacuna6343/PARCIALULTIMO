const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');
const { supabase, supabaseConfigured } = require('../lib/supabase');

const toSuscripcionResponse = (suscripcion) => {
  const cliente = mockData.clientes.find((c) => c.id === (suscripcion.clienteId || suscripcion.cliente_id));
  const fechaInicio = suscripcion.fechaInicio || suscripcion.fecha_inicio;
  const fechaRenovacion = suscripcion.fechaRenovacion || suscripcion.fecha_renovacion;

  return {
    id: suscripcion.id,
    clienteId: suscripcion.clienteId || suscripcion.cliente_id,
    clienteNombre: suscripcion.clientes?.nombre || cliente?.nombre,
    nombre: suscripcion.nombre,
    descripcion: suscripcion.descripcion || '',
    estado: suscripcion.estado,
    valor: suscripcion.valor,
    frecuencia: suscripcion.frecuencia,
    fechaInicio,
    fechaRenovacion,
    proximoPago: suscripcion.proximoPago || suscripcion.proximo_pago || fechaRenovacion,
    createdAt: suscripcion.createdAt || suscripcion.created_at,
    updatedAt: suscripcion.updatedAt || suscripcion.updated_at,
  };
};

exports.listSuscripciones = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data: suscripciones, error } = await supabase
        .from('suscripciones')
        .select('*, clientes (id, nombre)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json({ success: true, data: (suscripciones || []).map(toSuscripcionResponse) });
    }

    const suscripciones = mockData.suscripciones.map((s) => toSuscripcionResponse(s));
    res.json({ success: true, data: suscripciones });
  } catch (error) {
    console.error('❌ Error listando suscripciones:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getSuscripcion = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data: suscripcion, error } = await supabase
        .from('suscripciones')
        .select('*, clientes (id, nombre)')
        .eq('id', parseInt(req.params.id))
        .single();

      if (error || !suscripcion) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
      }

      return res.json({ success: true, data: toSuscripcionResponse(suscripcion) });
    }

    const suscripcion = findById('suscripciones', parseInt(req.params.id));
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    res.json({ success: true, data: toSuscripcionResponse(suscripcion) });
  } catch (error) {
    console.error('❌ Error obteniendo suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createSuscripcion = async (req, res) => {
  try {
    const { clienteId, nombre, descripcion, valor, frecuencia, fechaInicio, estado, pago } = req.body;
    const clienteIdNumber = Number(clienteId);
    const valorNumber = Number(valor);

    if (!clienteIdNumber || !nombre || !frecuencia) {
      console.warn('Validación createSuscripcion fallida', {
        body: req.body,
        clienteIdNumber,
      });
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'clienteId, nombre y frecuencia son requeridos',
        details: {
          clienteId,
          nombre,
          frecuencia,
        },
      });
    }

    if (Number.isNaN(clienteIdNumber)) {
      console.warn('clienteId inválido en createSuscripcion', {
        body: req.body,
        clienteIdNumber,
      });
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'clienteId inválido' });
    }

    const fechaRenovacion = new Date(fechaInicio || new Date());
    if (frecuencia === 'mensual') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
    else if (frecuencia === 'trimestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
    else if (frecuencia === 'semestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
    else if (frecuencia === 'anual') fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

    if (supabaseConfigured && supabase) {
      const { data: cliente, error: clienteError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', clienteIdNumber)
        .single();

      if (clienteError || !cliente) {
        return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
      }

      const { data: suscripcion, error } = await supabase
        .from('suscripciones')
        .insert([
          {
            cliente_id: clienteIdNumber,
            nombre,
            descripcion: descripcion || '',
            valor: Number.isNaN(valorNumber) ? 0 : valorNumber,
            frecuencia,
            fecha_inicio: fechaInicio ? new Date(fechaInicio) : new Date(),
            fecha_renovacion: fechaRenovacion,
            estado: estado || 'activa',
            pago: pago || 'pendiente',
          },
        ])
        .select('*, clientes (id, nombre)')
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data: toSuscripcionResponse(suscripcion), message: 'Suscripción creada exitosamente' });
    }

    const cliente = findById('clientes', clienteIdNumber);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const suscripcion = addItem('suscripciones', {
      clienteId: clienteIdNumber,
      nombre,
      descripcion: descripcion || '',
      valor: Number.isNaN(valorNumber) ? 0 : valorNumber,
      frecuencia,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
      fechaRenovacion,
      estado: estado || 'activa',
      pago: pago || 'pendiente',
    });

    res.status(201).json({ success: true, data: toSuscripcionResponse(suscripcion), message: 'Suscripción creada exitosamente' });
  } catch (error) {
    console.error('❌ Error creando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateSuscripcion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: existing, error: existingError } = await supabase
        .from('suscripciones')
        .select('*')
        .eq('id', id)
        .single();

      if (existingError || !existing) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
      }

      const updateData = {};
      if (req.body.clienteId) updateData.cliente_id = req.body.clienteId;
      if (req.body.nombre) updateData.nombre = req.body.nombre;
      if (req.body.descripcion !== undefined) updateData.descripcion = req.body.descripcion;
      if (req.body.estado) updateData.estado = req.body.estado;
      if (req.body.valor !== undefined) updateData.valor = Number(req.body.valor);
      if (req.body.frecuencia) updateData.frecuencia = req.body.frecuencia;
      if (req.body.fechaInicio) updateData.fecha_inicio = new Date(req.body.fechaInicio);
      if (req.body.fechaRenovacion) updateData.fecha_renovacion = new Date(req.body.fechaRenovacion);
      if (req.body.pago) updateData.pago = req.body.pago;

      if (updateData.cliente_id) {
        const { data: cliente, error: clienteError } = await supabase
          .from('clientes')
          .select('*')
          .eq('id', updateData.cliente_id)
          .single();

        if (clienteError || !cliente) {
          return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
        }
      }

      const { data: actualizado, error } = await supabase
        .from('suscripciones')
        .update(updateData)
        .eq('id', id)
        .select('*, clientes (id, nombre)')
        .single();

      if (error) throw error;
      return res.json({ success: true, data: toSuscripcionResponse(actualizado), message: 'Suscripción actualizada exitosamente' });
    }

    const suscripcion = findById('suscripciones', id);
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    const actualizada = updateItem('suscripciones', id, req.body);
    res.json({ success: true, data: toSuscripcionResponse(actualizada), message: 'Suscripción actualizada exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteSuscripcion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: suscripcion, error: existingError } = await supabase
        .from('suscripciones')
        .select('*')
        .eq('id', id)
        .single();

      if (existingError || !suscripcion) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
      }

      const { error } = await supabase
        .from('suscripciones')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.json({ success: true, message: 'Suscripción eliminada exitosamente' });
    }

    const suscripcion = findById('suscripciones', id);
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    deleteItem('suscripciones', id);
    res.json({ success: true, message: 'Suscripción eliminada exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.renovarSuscripcion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (supabaseConfigured && supabase) {
      const { data: suscripcion, error: existingError } = await supabase
        .from('suscripciones')
        .select('*')
        .eq('id', id)
        .single();

      if (existingError || !suscripcion) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
      }

      const fechaRenovacion = new Date(suscripcion.fecha_renovacion);
      if (suscripcion.frecuencia === 'mensual') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
      else if (suscripcion.frecuencia === 'trimestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
      else if (suscripcion.frecuencia === 'semestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
      else if (suscripcion.frecuencia === 'anual') fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

      const { data: actualizada, error } = await supabase
        .from('suscripciones')
        .update({ fecha_renovacion: fechaRenovacion, estado: 'activa', pago: 'pagado' })
        .eq('id', id)
        .select('*, clientes (id, nombre)')
        .single();

      if (error) throw error;
      return res.json({ success: true, data: toSuscripcionResponse(actualizada), message: 'Suscripción renovada exitosamente' });
    }

    const suscripcion = findById('suscripciones', id);
    if (!suscripcion) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Suscripción no encontrada' });
    }

    const fechaRenovacion = new Date(suscripcion.fechaRenovacion);
    if (suscripcion.frecuencia === 'mensual') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
    else if (suscripcion.frecuencia === 'trimestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
    else if (suscripcion.frecuencia === 'semestral') fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
    else if (suscripcion.frecuencia === 'anual') fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);

    const actualizada = updateItem('suscripciones', id, {
      fechaRenovacion,
      estado: 'activa',
      pago: 'pagado',
    });

    res.json({ success: true, data: toSuscripcionResponse(actualizada), message: 'Suscripción renovada exitosamente' });
  } catch (error) {
    console.error('❌ Error renovando suscripción:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
