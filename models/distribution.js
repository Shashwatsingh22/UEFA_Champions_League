const Sequelize = require('sequelize');
const sequelize = require('../database/config');
const Players = require('../models/users')


const Distribution = sequelize.define(
    'Distribution',
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
//pass_accuracy,pass_attempted,pass_completed,cross_accuracy,
        pass_accuracy : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        pass_attempted : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        pass_completed : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        cross_accuracy : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        //,cross_complted,freekicks_taken,match_played
        cross_attempted:{
            type: Sequelize.INTEGER,
            allowNull : true
        },
        freekicks_taken:{
            type: Sequelize.INTEGER,
            allowNull : true
        },
        match_played:{
        type: Sequelize.INTEGER,
        allowNull : true
    }
    }
 );

 module.exports = Distribution;