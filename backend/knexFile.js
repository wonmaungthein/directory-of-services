// Update with your config settings.

module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos.db'
    },
    migrations: {
      directory: `${__dirname}./migrations`
    },
    seeds: {
      directory: `${__dirname}./seeds/test`
    }
  },
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos.db'
    },
    migrations: {
      directory: `${__dirname}./migrations`
    },
    seeds: {
      directory: `${__dirname}./seeds/development`
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
      directory: `${__dirname}/migrations`
    },
    sseds: {
      directory: `${__dirname}/seeds/productions`
    }
  }
};
