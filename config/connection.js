const Sequelize = require('sequelize');
require('dotenv').config();

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    //host for mysql
    host: 'localhost',
    //the dialect configuration lets us know which database we are using
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;