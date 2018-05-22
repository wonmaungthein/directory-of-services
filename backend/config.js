
const knex = require('knex');
const knexFile = require('./knexFile');

const environment = process.env.NODE_ENV || 'development';
module.exports = {
  knex: knex(knexFile[environment]),
  port: process.env.PORT || 3002,
  apiPrefic: 'api'
}
