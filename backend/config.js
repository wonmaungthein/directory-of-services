
import Knex from 'knex';
import knexFile from './knexFile';

const environment = process.env.NODE_ENV || 'development';
module.exports = {
  knex: Knex(knexFile[environment]),
  port: process.env.PORT || 3002,
  apiPrefic: 'api'
}
