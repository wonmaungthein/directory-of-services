// Update with your config settings.

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
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos.db'
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/development`
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    sseds: {
      directory: `${__dirname}/db/seeds/productions`
    }
  }
};
