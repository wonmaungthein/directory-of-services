
import Knex from 'knex';
import knexFile from './knexfile';

const environment = process.env.NODE_ENV || 'development';
module.exports = {
  knex: Knex(knexFile[environment]),
  port: process.env.PORT || 3002
}
