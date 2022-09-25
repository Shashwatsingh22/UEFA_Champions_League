const Sequelize = require('sequelize');
const sequelize = require('../database/config');
const Players = require('../models/users')


const Goalkeeping = sequelize.define(
    'Goalkeeping',
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
//saved,conceded,saved_penalties,cleansheets,,match_played
        conceded : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        saved : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        saved_penalties : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        cleansheets : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        punches_made : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        
        match_played:{
        type: Sequelize.INTEGER,
        allowNull : true
    }
    }
 );

 module.exports = Goalkeeping;