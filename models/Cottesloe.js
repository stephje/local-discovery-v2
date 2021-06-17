const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cottesloe extends Model { }

Cottesloe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgdesc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionheading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listheading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listitem1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listitem2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listitem3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listitem4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listitem5: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT(20,15),
            allowNull: true,
        },
        lon: {
            type: DataTypes.FLOAT(20,15),
            allowNull: true,
        }
    },
    {
        //   hooks: {},
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cottesloe',
    }
);

module.exports = Cottesloe;

