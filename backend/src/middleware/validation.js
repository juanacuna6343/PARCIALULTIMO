const validate = (schema) => {
  return (req, res, next) => {
    const errors = {};
    
    // Validar cliente
    if (schema.nombre) {
      if (!req.body.nombre || typeof req.body.nombre !== 'string' || req.body.nombre.trim().length === 0) {
        errors.nombre = ['El nombre es requerido y debe ser texto'];
      }
    }

    if (schema.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!req.body.email || !emailRegex.test(req.body.email)) {
        errors.email = ['Correo electrónico inválido'];
      }
    }

    if (schema.password) {
      if (!req.body.password || req.body.password.length < 6) {
        errors.password = ['La contraseña debe tener al menos 6 caracteres'];
      }
    }

    if (schema.valor) {
      const valor = parseFloat(req.body.valor);
      if (isNaN(valor) || valor <= 0) {
        errors.valor = ['El valor debe ser un número positivo'];
      }
    }

    if (schema.fechaInicio) {
      if (!req.body.fechaInicio || isNaN(new Date(req.body.fechaInicio).getTime())) {
        errors.fechaInicio = ['Fecha de inicio inválida'];
      }
    }

    if (schema.fechaFin) {
      if (!req.body.fechaFin || isNaN(new Date(req.body.fechaFin).getTime())) {
        errors.fechaFin = ['Fecha final inválida'];
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Errores de validación',
          errors
        }
      });
    }

    next();
  };
};

// Esquemas de validación
const schemas = {
  login: {
    email: true,
    password: true
  },
  cliente: {
    nombre: true,
    email: true
  },
  servicio: {
    tipo: true,
    valor: true
  },
  suscripcion: {
    nombre: true,
    valor: true,
    fechaInicio: true,
    fechaRenovacion: true
  },
  evento: {
    titulo: true,
    fechaInicio: true,
    fechaFin: true
  },
  oportunidad: {
    titulo: true,
    valor: true
  }
};

module.exports = {
  validate,
  schemas
};
