const Sequelize = require('sequelize');
const sequelize = require('../database/config');
const Players = require('./users');

const Goals = sequelize.define(
    'Goals',
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
//goals,right_foot,left_foot,headers,others,inside_area,outside_areas,penalties,match_played
        goals : {
            type : Sequelize.INTEGER,
            allowNull : true
        },

        right_foot : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        left_foot : {
            type: Sequelize.INTEGER,
            allowNull : true
        },

        headers : {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        others: {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        inside_area: {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        outside_areas: {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        penalties: {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        match_played:{
        type: Sequelize.INTEGER,
        allowNull : true
    }
    }
 );

 module.exports = Goals;