var dbConfig = require('../app/config');
var Sequelize = require('sequelize');
const SEQUELIZE = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {}
db.Sequelize = Sequelize;
db.sequilize = SEQUELIZE;

// Table for the project - syntax 'db.<table_name>'
db.tutorial = require('./tutorial')(SEQUELIZE, Sequelize);
db.tutor = require('./tutor')(SEQUELIZE, Sequelize);

db.admin = require('./admin')(SEQUELIZE, Sequelize);
db.category = require('./category')(SEQUELIZE, Sequelize);

module.exports = db;