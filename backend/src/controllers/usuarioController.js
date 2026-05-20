const bcrypt = require('bcryptjs');
const { mockData, addItem, findById, updateItem } = require('../mockData');

exports.listUsuarios = (req, res) => {
  try {
    const usuarios = mockData.usuarios
      .map((u) => ({
        id: u.id,
        email: u.email,
        nombre: u.nombre,
        rol: u.rol,
        activo: u.activo,
        createdAt: u.createdAt,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('❌ Error listando usuarios:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.createUsuario = (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body;

    if (!email || !nombre) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Email y nombre son requeridos' });
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
      },
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error creando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.updateUsuario = (req, res) => {
  try {
    const usuario = findById('usuarios', parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    }

    const updates = { ...req.body };
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }

    const actualizado = updateItem('usuarios', parseInt(req.params.id), updates);
    res.json({
      success: true,
      data: {
        id: actualizado.id,
        email: actualizado.email,
        nombre: actualizado.nombre,
        rol: actualizado.rol,
        activo: actualizado.activo,
      },
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.deleteUsuario = (req, res) => {
  try {
    const usuario = findById('usuarios', parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    }

    updateItem('usuarios', parseInt(req.params.id), { activo: false });
    res.json({ success: true, message: 'Usuario desactivado exitosamente' });
  } catch (error) {
    console.error('❌ Error desactivando usuario:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
