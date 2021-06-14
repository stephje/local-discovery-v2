const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Adventure extends Model { }

Adventure.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        outdoor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        //   hooks: {},
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'adventure',
    }
);

module.exports = Adventure;
