const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Tarea extends Model {
  static associate(models) {
    this.belongsTo(models.Servicio, { foreignKey: 'servicioId', as: 'servicio' });
    this.belongsTo(models.Usuario, { foreignKey: 'responsableId', as: 'responsable' });
  }
}

Tarea.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaVencimiento: DataTypes.DATEONLY,
  prioridad: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'media'
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Tarea',
  tableName: 'tareas',
  timestamps: true
});

module.exports = Tarea;
