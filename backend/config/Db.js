
import Knex from 'knex';
import config from './config';

export default function () {
  // Initialize knex.
  const knex = Knex(config.development);
  // Bind all Models to a knex instance.
  knex.migrate.latest().then(() => console.log('Migrated.'));

}

