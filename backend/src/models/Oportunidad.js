const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Oportunidad extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    this.belongsTo(models.Usuario, { foreignKey: 'responsableId', as: 'responsable' });
  }
}

Oportunidad.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: DataTypes.TEXT,
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id'
    }
  },
  responsableId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  etapa: {
    type: DataTypes.ENUM('contacto', 'propuesta', 'negociacion', 'cierre', 'ganada', 'perdida'),
    allowNull: false,
    defaultValue: 'contacto'
  },
  valor: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  probabilidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  fechaEstimada: DataTypes.DATE,
  notas: DataTypes.TEXT,
  prioridad: {
    type: DataTypes.ENUM('baja', 'media', 'alta'),
    defaultValue: 'media'
  }
}, {
  sequelize,
  modelName: 'Oportunidad',
  tableName: 'oportunidades',
  timestamps: true
});

module.exports = Oportunidad;
