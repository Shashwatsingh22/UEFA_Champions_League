const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Defending = sequelize.define(
    'Defending',
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

        balls_recoverd : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        tackles : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        t_won : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
       t_lost : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        clearance_attempted:{
            type: Sequelize.INTEGER,
            allowNull : true
        },
        match_played : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
    }
 );

 module.exports = Defending;