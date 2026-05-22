const bcrypt = require('bcryptjs');
const { mockData, addItem, findById, updateItem } = require('../mockData');
const { supabase, supabaseConfigured } = require('../lib/supabase');

const formatUsuario = (usuario) => ({
  id: usuario.id,
  email: usuario.email,
  nombre: usuario.nombre,
  rol: usuario.rol,
  activo: usuario.activo,
  createdAt: usuario.created_at || usuario.createdAt,
  updatedAt: usuario.updated_at || usuario.updatedAt,
});

exports.listUsuarios = async (req, res) => {
  try {
    if (supabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id,email,nombre,rol,activo,created_at,updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return res.json({ success: true, data: data.map(formatUsuario) });
    }

    const usuarios = mockData.usuarios
      .map((u) => ({
        id: u.id,
        email: u.email,
        nombre: u.nombre,
        rol: u.rol,
        activo: u.activo,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('❌ Error listando usuarios:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body;

    if (!email || !nombre) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Email y nombre son requeridos' });
    }

    if (supabaseConfigured && supabase) {
      const { data: existingUser, error: existingError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingError) {
        throw existingError;
      }

      if (existingUser) {
        return res.status(409).json({ code: 'UNIQUE_CONSTRAINT', message: 'Email ya existe' });
      }

      const hashedPassword = bcrypt.hashSync(password || '123456', 10);
      const { data, error } = await supabase
        .from('usuarios')
        .insert([
          {
            email,
            password: hashedPassword,
            nombre,
            rol: rol || 'usuario',
            activo: true,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase crear usuario error:', error);
        return res.status(500).json({ code: 'DB_ERROR', message: error.message });
      }

      return res.status(201).json({ success: true, data: formatUsuario(data), message: 'Usuario creado exitosamente' });
    }

    const existe = mockData.usuarios.find((u) => u.email === email);
    if (existe) {
      return res.status(409).json({ code: 'UNIQUE_CONSTRAINT', message: 'Email ya existe' });
    }

    const hashedPassword = bcrypt.hashSync(password || '123456', 10);
    const usuario = addItem('usuarios', {
      email,
      password: hashedPassword,
      nombre,
      rol: rol || 'usuario',
      activo: true,
    });

    res.status(201).json({
      success: true,
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        activo: usuario.activo,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt,
      },
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error creando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (supabaseConfigured && supabase) {
      const { data: existingUser, error: getError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (getError) {
        throw getError;
      }

      if (!existingUser) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
      }

      const updates = { ...req.body };
      if (updates.password) {
        updates.password = bcrypt.hashSync(updates.password, 10);
      }

      const { data, error } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase update usuario error:', error);
        return res.status(500).json({ code: 'DB_ERROR', message: error.message });
      }

      return res.json({ success: true, data: formatUsuario(data), message: 'Usuario actualizado exitosamente' });
    }

    const usuario = findById('usuarios', id);
    if (!usuario) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    }

    const updates = { ...req.body };
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    const actualizado = updateItem('usuarios', id, updates);
    res.json({
      success: true,
      data: {
        id: actualizado.id,
        email: actualizado.email,
        nombre: actualizado.nombre,
        rol: actualizado.rol,
        activo: actualizado.activo,
        createdAt: actualizado.createdAt,
        updatedAt: actualizado.updatedAt,
      },
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (supabaseConfigured && supabase) {
      const { data: existingUser, error: getError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (getError) {
        throw getError;
      }

      if (!existingUser) {
        return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
      }

      const { error } = await supabase
        .from('usuarios')
        .update({ activo: false })
        .eq('id', id);

      if (error) {
        console.error('❌ Supabase delete usuario error:', error);
        return res.status(500).json({ code: 'DB_ERROR', message: error.message });
      }

      return res.json({ success: true, message: 'Usuario desactivado exitosamente' });
    }

    const usuario = findById('usuarios', id);
    if (!usuario) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    }

    updateItem('usuarios', id, { activo: false });
    res.json({ success: true, message: 'Usuario desactivado exitosamente' });
  } catch (error) {
    console.error('❌ Error desactivando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
