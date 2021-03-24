'use strict'

const Sequelize = require('sequelize');
const db = {};
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

let Sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;