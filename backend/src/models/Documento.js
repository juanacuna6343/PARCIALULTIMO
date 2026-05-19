const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Documento extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    this.belongsTo(models.Servicio, { foreignKey: 'servicioId', as: 'servicio' });
  }
}

Documento.init({
  tipo: DataTypes.STRING,
  urlArchivo: DataTypes.STRING,
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tamano: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Documento',
  tableName: 'documentos',
  timestamps: true
});

module.exports = Documento;
