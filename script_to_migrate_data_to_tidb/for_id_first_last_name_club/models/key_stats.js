const Sequelize = require('sequelize');
const sequelize = require('../database/config');
const Players = require('../models/users')

const KeyStats = sequelize.define(
    'KeyStats',
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
        //minutes_played,match_played,goals,assists,distance_covered
        minutes_played : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        match_played : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        goals : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        assists : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        distance_covered: {
            type: Sequelize.INTEGER,
            allowNull : true
        }
    }
 );

 module.exports = KeyStats;