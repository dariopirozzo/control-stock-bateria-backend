const app = require('./app')
const cors = require('cors')
const express = require('express')
require('dotenv').config()
const sequelize = require('./database/database');
require('./models/clientes.js')
require('./models/baterias.js')
require('./models/estadosGarantia.js')
require('./models/historialGarantia.js')
require('./models/usuarios.js')

async function main() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión establecida correctamente con PostgreSQL.');
        await sequelize.sync({ alter: true });
        console.log("tablas creadas")
        app.use(cors())
        app.use(express.static('public'))
        app.use(express.json())
        app.use('/api/auth', require('./routes/auth.routes.js'))
        // app.use('/api/events', require('./routes/events'))
        app.listen(4000)
        console.log('serverarriba');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}

main()