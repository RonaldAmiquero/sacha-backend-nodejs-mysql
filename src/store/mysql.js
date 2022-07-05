const mysql = require('mysql2')
const config = require('../config/configGlobal')

const pool = mysql.createPool({
   host: config.dbHost,
   user: config.dbUser,
   password: config.dbPassword,
   database: config.dbName,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
})
const poolPromise = pool.promise()

module.exports = { poolPromise }
