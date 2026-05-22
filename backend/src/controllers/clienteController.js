const { mockData, addItem, findById, updateItem, deleteItem } = require('../mockData');
const { supabase, supabaseConfigured } = require('../lib/supabase');

const sortByCreatedAtDesc = (items) =>
  [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const listClientesFromMock = async () => {
  return sortByCreatedAtDesc(mockData.clientes);
};

const getClienteFromMock = async (id) => {
  return findById('clientes', id);
};

const createClienteInMock = async (payload) => {
  return addItem('clientes', {
    nombre: payload.nombre,
    contacto: payload.contacto || '',
    email: payload.email,
    telefono: payload.telefono || '',
    sector: payload.sector || '',
    estado: 'activo',
  });
};

const updateClienteInMock = async (id, updates) => {
  return updateItem('clientes', id, updates);
};

const deleteClienteInMock = async (id) => {
  return deleteItem('clientes', id);
};

exports.listClientes = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data: clientes, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json({ success: true, data: clientes || [] });
    }

    const clientes = await listClientesFromMock();
    res.json({ success: true, data: clientes });
  } catch (error) {
    console.error('❌ Error listando clientes:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getCliente = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data: cliente, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', parseInt(req.params.id))
        .single();

      if (error || !cliente) {
        return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
      }

      return res.json({ success: true, data: cliente });
    }

    const cliente = await getClienteFromMock(parseInt(req.params.id));
    if (!cliente) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Cliente no encontrado' } });
    }

    res.json({ success: true, data: cliente });
  } catch (error) {
    console.error('❌ Error obteniendo cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, contacto, email, telefono, sector } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Nombre y email son requeridos' });
    }

    if (supabaseConfigured && supabase) {
      const { data: existe, error: existError } = await supabase
        .from('clientes')
        .select('*')
        .eq('email', email)
        .single();

      if (existError) throw existError;
      if (existe) {
        return res.status(409).json({ code: 'UNIQUE_CONSTRAINT', message: 'Email ya existe' });
      }

      const { data: cliente, error } = await supabase
        .from('clientes')
        .insert([
          {
            nombre,
            contacto: contacto || '',
            email,
            telefono: telefono || '',
            sector: sector || '',
            estado: 'activo',
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data: cliente, message: 'Cliente creado exitosamente' });
    }

    const cliente = await createClienteInMock({ nombre, contacto, email, telefono, sector });
    res.status(201).json({ success: true, data: cliente, message: 'Cliente creado exitosamente' });
  } catch (error) {
    console.error('❌ Error creando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: cliente, error: getError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', id)
        .single();

      if (!cliente || getError) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
      }

      const { data: actualizado, error } = await supabase
        .from('clientes')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json({ success: true, data: actualizado, message: 'Cliente actualizado exitosamente' });
    }

    const cliente = await getClienteFromMock(id);
    if (!cliente) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
    }

    const actualizado = await updateClienteInMock(id, req.body);
    res.json({ success: true, data: actualizado, message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error actualizando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (supabaseConfigured && supabase) {
      const { data: cliente, error: getError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', id)
        .single();

      if (!cliente || getError) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
      }

      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.json({ success: true, message: 'Cliente eliminado exitosamente' });
    }

    const cliente = await getClienteFromMock(id);
    if (!cliente) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Cliente no encontrado' });
    }

    await deleteClienteInMock(id);
    res.json({ success: true, message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando cliente:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
