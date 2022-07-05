require('dotenv').config()
module.exports = {
   port: process.env.PORT || 3002,
   host: process.env.HOST || 'http://localhost',
   dbHost: process.env.DB_HOST || 'localhost',
   dbUser: process.env.DB_USER || 'roo',
   dbPassword: process.env.DB_PASSWORD || 'CH3ATM1999',
   dbName: process.env.DB_NAME || 'db_sacha'
}
