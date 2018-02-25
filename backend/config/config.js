
module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'Production',
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../data/dos.db'
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
};
