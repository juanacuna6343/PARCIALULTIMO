const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Token no proporcionado' } });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: { code: 'AUTH_FAILED', message: 'Token inválido o expirado' } });
  }
}

module.exports = authenticate;
