const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Bateria = require('./baterias');
const EstadoGarantia = require('./estadosGarantia');

const HistorialGarantia = sequelize.define('HistorialGarantia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_actualizacion: DataTypes.DATE,
    comentario: DataTypes.TEXT,
});

HistorialGarantia.belongsTo(Bateria);
HistorialGarantia.belongsTo(EstadoGarantia);

module.exports = HistorialGarantia;
