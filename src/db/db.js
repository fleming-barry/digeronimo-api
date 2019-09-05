const sql = require('mssql')
const config = {
    server: process.env.DB_USER, // Use your SQL server name
    database: "TradeDatabaseProject", // Database to connect to
    user: process.env.USER, // Use your username
    password: process.env.PASSWORD, // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
        encrypt: true
    }
}
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = { poolPromise, sql }