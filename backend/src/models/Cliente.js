const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Cliente extends Model {
  static associate(models) {
    this.hasMany(models.Servicio, { foreignKey: 'clienteId', as: 'servicios' });
    this.hasMany(models.Documento, { foreignKey: 'clienteId', as: 'documentos' });
  }
}

Cliente.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  telefono: DataTypes.STRING,
  sector: DataTypes.STRING,
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo'
  }
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'clientes',
  timestamps: true
});

module.exports = Cliente;
