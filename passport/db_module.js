module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
  }

const dbConfig = {
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  max: config.db.max,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
}

const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
  winston.error('idle client error', err.message, err.stack)
})