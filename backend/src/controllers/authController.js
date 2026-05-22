const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { mockData } = require('../mockData');
const { supabase, supabaseConfigured } = require('../lib/supabase');
const env = require('../config/env');

const getUserByEmail = async (email) => {
  if (supabaseConfigured && supabase) {
    const { data, error } = await supabase.from('usuarios').select('*').eq('email', email).maybeSingle();
    if (error) throw error;
    return data;
  }

  return mockData.usuarios.find((u) => u.email === email);
};

const getUserById = async (id) => {
  if (supabaseConfigured && supabase) {
    const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  return mockData.usuarios.find((u) => u.id === id);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Email y contraseña requeridos' });
    }

    const usuario = await getUserByEmail(email);

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ code: 'AUTH_FAILED', message: 'Credenciales inválidas' });
    }

    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(401).json({ code: 'AUTH_FAILED', message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: usuario.id, email: usuario.email, role: usuario.rol }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre,
          rol: usuario.rol,
        },
      },
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const usuario = await getUserById(req.user.userId);

    if (!usuario) {
      return res.status(404).json({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      success: true,
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        activo: usuario.activo,
      },
    });
  } catch (error) {
    console.error('❌ Error en profile:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
