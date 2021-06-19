const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userKingspark extends Model { }

userKingspark.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        sequence: {
            type: DataTypes.INTEGER,
        },
        ratingNo: {
            type: DataTypes.INTEGER,
        },
        ratingDesc: {
            type: DataTypes.STRING,
        },
        dateCompletedRecent: {
            type: DataTypes.STRING,
        },
        durationPB: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'userKingspark',
    }
);

module.exports = userKingspark;

