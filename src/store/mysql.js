const mysql = require('mysql2')

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'CH3ATM1999',
   database: 'db_sacha',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
})
const poolPromise = pool.promise()

module.exports = { poolPromise }
