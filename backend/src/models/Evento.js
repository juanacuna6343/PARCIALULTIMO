const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Evento extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'organizadorId', as: 'organizador' });
  }
}

Evento.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: DataTypes.TEXT,
  tipo: {
    type: DataTypes.ENUM('charla', 'taller', 'conferencia', 'reunion', 'otro'),
    allowNull: false,
    defaultValue: 'charla'
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ubicacion: DataTypes.STRING,
  cuposDisponibles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100
  },
  cuposOcupados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  inscriptos: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  estado: {
    type: DataTypes.ENUM('planificado', 'confirmado', 'en_curso', 'completado', 'cancelado'),
    allowNull: false,
    defaultValue: 'planificado'
  },
  organizadorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  enlaceZoom: DataTypes.STRING,
  materialUrl: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Evento',
  tableName: 'eventos',
  timestamps: true
});

module.exports = Evento;
