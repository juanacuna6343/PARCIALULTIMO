const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class AuditLog extends Model {}

AuditLog.init({
  usuarioId: DataTypes.INTEGER,
  accion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tablaAfectada: DataTypes.STRING,
  registroId: DataTypes.INTEGER,
  cambiosAntes: DataTypes.JSON,
  cambiosDespues: DataTypes.JSON,
  ipOrigen: DataTypes.STRING,
  userAgent: DataTypes.STRING
}, {
  sequelize,
  modelName: 'AuditLog',
  tableName: 'audit_logs',
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false
});

module.exports = AuditLog;
