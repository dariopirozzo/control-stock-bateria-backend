const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const EstadoGarantia = sequelize.define('EstadoGarantia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
});

module.exports = EstadoGarantia;
