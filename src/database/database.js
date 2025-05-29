const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('neondb', 'neondb_owner', 'npg_PvGURW4kI9Mi', {
    host: 'ep-solitary-glade-a5gmy804-pooler.us-east-2.aws.neon.tech',
    port: 5432, // Puerto por defecto para PostgreSQL
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
});

module.exports = sequelize;
