const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Suscripcion extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
  }
}

Suscripcion.init({
  nombre: {
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
  valor: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  frecuencia: {
    type: DataTypes.ENUM('mensual', 'trimestral', 'semestral', 'anual'),
    allowNull: false,
    defaultValue: 'mensual'
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaRenovacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activa', 'vencida', 'pausada', 'cancelada'),
    allowNull: false,
    defaultValue: 'activa'
  },
  pago: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'atrasado'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  sequelize,
  modelName: 'Suscripcion',
  tableName: 'suscripciones',
  timestamps: true
});

module.exports = Suscripcion;
