const Sequelize = require('sequelize');
const sequelize = require('../database/config');
const Players = require('../models/users')


const Attempts = sequelize.define(
    'Attempts',
    {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey: true,
        },

        playerId : {
            type : Sequelize.INTEGER,
            allowNull : false,
            refrences : {
                model : Players,
                key : 'id'
            }
        },

        position : {
            type : Sequelize.STRING,
            allowNull : true
        },

        total_attempts : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        on_target : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        blocked : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        match_played : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
    }
 );

 module.exports = Attempts;