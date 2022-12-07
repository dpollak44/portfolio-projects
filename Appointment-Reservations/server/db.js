const { Sequelize } = require('sequelize');
require('dotenv').config()

const { PORT, HOST, USER, PASSWORD, DB } = process.env;
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

module.exports = sequelize