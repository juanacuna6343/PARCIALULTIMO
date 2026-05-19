const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Cliente = require('./Cliente');
const Servicio = require('./Servicio');
const Tarea = require('./Tarea');
const Documento = require('./Documento');
const AuditLog = require('./AuditLog');

const models = {
  Usuario,
  Cliente,
  Servicio,
  Tarea,
  Documento,
  AuditLog
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
