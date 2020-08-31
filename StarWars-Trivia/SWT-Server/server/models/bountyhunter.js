//const { DataTypes, Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const BountyHunter = sequelize.define('bountyhunter', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        points:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        gep:{ //Galactic Era points
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        rebp:{// Rebellion Era points
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        resp:{//Resistance Era points
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        // responseId:{
        //     type: Sequelize.UUID,
        //     foreignKey: true,
        // }
    })
    return BountyHunter;
}