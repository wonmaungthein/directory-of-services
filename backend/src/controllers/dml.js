
import { Model, transaction } from 'objection';
import Knex from 'knex';
import knexConfig from '../../knexfile';
import Organisation from '../model/Organisation';

// initialize kex
const knex = Knex(knexConfig.development);

// build all models to a knex instance

Model.knex(knex);

const knexs = Organisation.knex();

const Insert = async (query) => {
  let trx
  try {
    trx = await transaction.start(knexs);
    const organisation = await Organisation
      .query(trx)
      .insertGraph(query);
    await trx.commit();
    console.log(organisation, 'Data is inserted !')
  } catch (err) {
    await trx.rollback();
    console.log('Something went wrong. Data is not inserted', err);
  }
}

const Select = async () => {
  const organisation = await Organisation
    .query()
    .eager('branch');
  return organisation;
};

module.exports = {
  Insert,
  Select
}
