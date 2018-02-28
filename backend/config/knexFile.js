
import Knex from 'knex';
import config from './config';

// Initialize knex.
const knex = Knex(config.development);

module.exports = knex;
