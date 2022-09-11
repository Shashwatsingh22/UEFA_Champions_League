const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Attacking = sequelize.define(
    'Attacking',
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

        assists : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        corner_taken : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        offsides : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        dribbles : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        match_played : {
            type: Sequelize.INTEGER,
            allowNull : true
        }

    }
 );

 module.exports = Attacking;