function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err.message);

  // Errores personalizados
  if (err.status && err.code) {
    return res.status(err.status).json({
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    });
  }

  // Error genérico
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  return res.status(status).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message
    }
  });
}

module.exports = errorHandler;

