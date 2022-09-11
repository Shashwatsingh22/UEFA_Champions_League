const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Players = sequelize.define(
    'Players',
    {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey: true,
        },

        firstName : {
            type : Sequelize.STRING,
            allowNull : false
        },

        lastName : {
            type : Sequelize.STRING,
            allowNull : true
        },

        clubName : {
            type: Sequelize.STRING,
            allowNull : false
        }

    }
 );

 module.exports = Players;