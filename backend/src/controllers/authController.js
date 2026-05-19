const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const env = require('../config/env');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email y password son requeridos' } });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !usuario.activo) {
      return res.status(401).json({ success: false, error: { code: 'AUTH_FAILED', message: 'Credenciales inválidas' } });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: { code: 'AUTH_FAILED', message: 'Credenciales inválidas' } });
    }

    const token = jwt.sign({ userId: usuario.id, email: usuario.email, role: usuario.rol }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
    return res.json({ success: true, data: { token, usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol } } });
  } catch (error) {
    next(error);
  }
}

async function profile(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.user.userId, { attributes: ['id', 'email', 'nombre', 'rol', 'activo'] });
    if (!usuario) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado' } });
    }
    return res.json({ success: true, data: usuario });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  profile
};
