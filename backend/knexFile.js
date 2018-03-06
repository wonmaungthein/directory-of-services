
const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos.db'
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds', 'development')
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'dos'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
