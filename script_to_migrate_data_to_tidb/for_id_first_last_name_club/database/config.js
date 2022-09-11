const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'uefa_champions_league',
    'root',
    '',
    {
     dialect: "mysql",
     host : "localhost",
     dialectModule: require('mysql2')
});
module.exports = sequelize;