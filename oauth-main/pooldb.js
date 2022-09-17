const Pool = require('pg').Pool
const pool = new Pool({
  user: 'petejackerson',
  host: 'localhost',
  database: 'oauth-test',
  password: 'redsox45',
  port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, (err, res) => {
        console.log('executed query')
        callback(err, res)
      })
    },
}