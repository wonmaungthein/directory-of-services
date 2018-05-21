const dotenv = require('dotenv');

dotenv.config()

module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos_test.db'
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`
    }
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/productions`
    }
  },
  productions: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/productions`
    }
  }
};
