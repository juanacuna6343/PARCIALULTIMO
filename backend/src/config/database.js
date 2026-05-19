const { Sequelize } = require('sequelize');
const env = require('./env');

const config = {
  dialect: env.db.dialect,
  logging: false,
};

if (env.db.dialect === 'sqlite') {
  config.storage = env.db.storage;
} else {
  config.host = env.db.host;
  config.port = env.db.port;
  config.database = env.db.database;
  config.username = env.db.username;
  config.password = env.db.password;
}

const sequelize = new Sequelize(config);

module.exports = sequelize;
