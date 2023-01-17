require('dotenv').config()
module.exports = {
   port: process.env.PORT || 3002,
   host: process.env.HOST || 'http://localhost',
   dbHost: process.env.DB_HOST || 'localhost',
   dbPort: process.env.DB_PORT || 3306,
   dbUser: process.env.DB_USER || 'root',
   dbPassword: process.env.DB_PASSWORD || 'CH3ATM1999',
   dbName: process.env.DB_NAME || 'db_sacha'
}
