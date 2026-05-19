const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Servicio extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    this.hasMany(models.Tarea, { foreignKey: 'servicioId', as: 'tareas' });
    this.hasMany(models.Documento, { foreignKey: 'servicioId', as: 'documentos' });
  }
}

Servicio.init({
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaInicio: DataTypes.DATEONLY,
  fechaFin: DataTypes.DATEONLY,
  valor: DataTypes.DECIMAL(12, 2),
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente'
  },
  descripcion: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Servicio',
  tableName: 'servicios',
  timestamps: true
});

module.exports = Servicio;
