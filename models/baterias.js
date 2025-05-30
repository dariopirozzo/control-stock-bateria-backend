const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Cliente = require('./clientes');
const EstadoGarantia = require('./estadosGarantia');

const Baterias = sequelize.define('Bateria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: DataTypes.STRING,
    numero_serie: DataTypes.STRING,
    numero_garantia: DataTypes.STRING,
    fecha_caducidad: DataTypes.DATE,
});

Baterias.belongsTo(Cliente);
Baterias.belongsTo(EstadoGarantia, { as: 'estado_actual' });

module.exports = Baterias;
