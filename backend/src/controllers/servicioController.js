const { mockData, addItem, findById, updateItem, deleteItem, findAllByField } = require('../mockData');
const { supabase, supabaseConfigured } = require('../lib/supabase');

const toServicioResponse = (servicio) => {
  const cliente = mockData.clientes.find((c) => c.id === (servicio.clienteId || servicio.cliente_id));
  return {
    id: servicio.id,
    nombre: servicio.tipo || servicio.nombre,
    descripcion: servicio.descripcion || '',
    clienteId: servicio.clienteId || servicio.cliente_id,
    clienteNombre: cliente?.nombre || 'N/A',
    estado: servicio.estado,
    precio: servicio.valor || servicio.precio || 0,
    fechaInicio: servicio.fechaInicio || servicio.fecha_inicio,
    fechaFin: servicio.fechaFin || servicio.fecha_fin,
    notas: servicio.descripcion || '',
    createdAt: servicio.createdAt || servicio.created_at,
    updatedAt: servicio.updatedAt || servicio.updated_at,
  };
};

const listServiciosFromMock = async () => {
  const servicios = [...mockData.servicios].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return servicios.map(toServicioResponse);
};

const getServicioFromMock = async (id) => {
  return findById('servicios', id);
};

const createServicioInMock = async ({ nombre, clienteId, fechaInicio, fechaFin, precio, estado, descripcion }) => {
  return addItem('servicios', {
    tipo: nombre,
    clienteId,
    fechaInicio: fechaInicio || new Date(),
    fechaFin: fechaFin || null,
    valor: precio || 0,
    estado: estado || 'pendiente',
    descripcion: descripcion || '',
  });
};

const updateServicioInMock = async (id, updates) => {
  const updateData = { ...updates };
  if (updateData.nombre) updateData.tipo = updateData.nombre;
  if (updateData.precio) updateData.valor = updateData.precio;
  delete updateData.nombre;
  delete updateData.precio;
  return updateItem('servicios', id, updateData);
};

const listHitosFromMock = async (servicioId) => {
  return findAllByField('tareas', 'servicioId', servicioId).map((t) => ({
    ...t,
    servicio_id: t.servicioId,
    usuario_id: t.responsableId,
  }));
};

const addHitoInMock = async (servicioId, body) => {
  const tarea = addItem('tareas', {
    titulo: body.titulo,
    descripcion: body.descripcion || '',
    fechaVencimiento: body.fechaVencimiento || null,
    prioridad: body.prioridad || 'media',
    completada: false,
    servicioId,
    responsableId: body.responsableId || null,
  });
  return tarea;
};

exports.listServicios = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data: servicios, error } = await supabase
        .from('servicios')
        .select(`
          *,
          clientes (id, nombre)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const response = servicios.map((s) => ({
        id: s.id,
        nombre: s.tipo,
        descripcion: s.descripcion,
        clienteId: s.cliente_id,
        clienteNombre: s.clientes?.nombre || 'N/A',
        estado: s.estado,
        precio: s.valor,
        fechaInicio: s.fecha_inicio,
        fechaFin: s.fecha_fin,
        notas: s.descripcion,
        createdAt: s.created_at,
        updatedAt: s.updated_at,
      }));

      return res.json({ success: true, data: response || [] });
    }

    const servicios = await listServiciosFromMock();
    res.json({ success: true, data: servicios });
  } catch (error) {
    console.error('❌ Error listando servicios:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createServicio = async (req, res) => {
  try {
    const { nombre, clienteId, fechaInicio, fechaFin, precio, estado, descripcion } = req.body;

    if (!nombre || !clienteId) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y clienteId son requeridos' });
    }

    if (supabaseConfigured && supabase) {
      const { data: cliente, error: clienteError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', clienteId)
        .single();

      if (!cliente || clienteError) {
        return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
      }

      const { data: servicio, error } = await supabase
        .from('servicios')
        .insert([
          {
            tipo: nombre,
            cliente_id: clienteId,
            fecha_inicio: fechaInicio || new Date(),
            fecha_fin: fechaFin || null,
            valor: precio || 0,
            estado: estado || 'pendiente',
            descripcion: descripcion || '',
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const response = {
        id: servicio.id,
        nombre: servicio.tipo,
        descripcion: servicio.descripcion,
        clienteId: servicio.cliente_id,
        clienteNombre: cliente.nombre,
        estado: servicio.estado,
        precio: servicio.valor,
        fechaInicio: servicio.fecha_inicio,
        fechaFin: servicio.fecha_fin,
        notas: servicio.descripcion,
        createdAt: servicio.created_at,
        updatedAt: servicio.updated_at,
      };

      return res.status(201).json({ success: true, data: response, message: 'Servicio creado exitosamente' });
    }

    const cliente = findById('clientes', clienteId);
    if (!cliente) {
      return res.status(400).json({ code: 'FOREIGN_KEY_ERROR', message: 'Cliente no existe' });
    }

    const servicio = await createServicioInMock({ nombre, clienteId, fechaInicio, fechaFin, precio, estado, descripcion });
    res.status(201).json({ success: true, data: toServicioResponse(servicio), message: 'Servicio creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando servicio:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateServicio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: servicio, error: getError } = await supabase
        .from('servicios')
        .select('*')
        .eq('id', id)
        .single();

      if (!servicio || getError) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
      }

      const updateData = { ...req.body };
      if (updateData.nombre) updateData.tipo = updateData.nombre;
      if (updateData.precio) updateData.valor = updateData.precio;
      delete updateData.nombre;
      delete updateData.precio;

      const { data: actualizado, error } = await supabase
        .from('servicios')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const { data: cliente } = await supabase
        .from('clientes')
        .select('nombre')
        .eq('id', actualizado.cliente_id)
        .single();

      const response = {
        id: actualizado.id,
        nombre: actualizado.tipo,
        descripcion: actualizado.descripcion,
        clienteId: actualizado.cliente_id,
        clienteNombre: cliente?.nombre || 'N/A',
        estado: actualizado.estado,
        precio: actualizado.valor,
        fechaInicio: actualizado.fecha_inicio,
        fechaFin: actualizado.fecha_fin,
        notas: actualizado.descripcion,
        createdAt: actualizado.created_at,
        updatedAt: actualizado.updated_at,
      };

      return res.json({ success: true, data: response, message: 'Servicio actualizado exitosamente' });
    }

    const servicio = await getServicioFromMock(id);
    if (!servicio) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
    }

    const actualizado = await updateServicioInMock(id, req.body);
    res.json({ success: true, data: toServicioResponse(actualizado), message: 'Servicio actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando servicio:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteServicio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: servicio, error: getError } = await supabase
        .from('servicios')
        .select('*')
        .eq('id', id)
        .single();

      if (!servicio || getError) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
      }

      const { error } = await supabase
        .from('servicios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.json({ success: true, message: 'Servicio eliminado exitosamente' });
    }

    const servicio = await getServicioFromMock(id);
    if (!servicio) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
    }

    await deleteItem('servicios', id);
    res.json({ success: true, message: 'Servicio eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando servicio:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.listHitos = async (req, res) => {
  try {
    const servicioId = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: tareas, error } = await supabase
        .from('tareas')
        .select('*')
        .eq('servicio_id', servicioId);

      if (error) throw error;
      return res.json({ success: true, data: tareas || [] });
    }

    const tareas = await listHitosFromMock(servicioId);
    res.json({ success: true, data: tareas });
  } catch (error) {
    console.error('❌ Error listando hitos:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.addHito = async (req, res) => {
  try {
    const servicioId = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: servicio, error: getError } = await supabase
        .from('servicios')
        .select('*')
        .eq('id', servicioId)
        .single();

      if (!servicio || getError) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
      }

      const { titulo, descripcion, fechaVencimiento, prioridad, responsableId } = req.body;

      if (!titulo) {
        return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título es requerido' });
      }

      const { data: tarea, error } = await supabase
        .from('tareas')
        .insert([
          {
            titulo,
            descripcion: descripcion || '',
            fecha_vencimiento: fechaVencimiento || null,
            prioridad: prioridad || 'media',
            completada: false,
            servicio_id: servicioId,
            usuario_id: responsableId || null,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data: tarea, message: 'Hito agregado exitosamente' });
    }

    const servicio = await getServicioFromMock(servicioId);
    if (!servicio) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Servicio no encontrado' });
    }

    const { titulo, descripcion, fechaVencimiento, prioridad, responsableId } = req.body;
    if (!titulo) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Título es requerido' });
    }

    const tarea = await addHitoInMock(servicioId, {
      titulo,
      descripcion,
      fechaVencimiento,
      prioridad,
      responsableId,
    });

    res.status(201).json({ success: true, data: tarea, message: 'Hito agregado exitosamente' });
  } catch (error) {
    console.error('❌ Error agregando hito:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
