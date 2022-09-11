const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Disciplinary = sequelize.define(
    'Disciplinary',
    {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey: true,
        },
        playerId : {
            type : Sequelize.INTEGER,
            allowNull : false
        },

        position : {
            type : Sequelize.STRING,
            allowNull : true
        },
        
        fouls_committed : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        fouls_suffered : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        red : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        yellow : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        minutes_played:{
            type: Sequelize.INTEGER,
            allowNull : true
        },
        match_played : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
    }
 );

 module.exports = Disciplinary;