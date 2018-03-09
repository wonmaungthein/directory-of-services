
import { transaction } from 'objection';
import Organisation from '../model/Organisation';

const knex = Organisation.knex();

const Insert = async (query) => {
  let trx
  try {
    trx = await transaction.start(knex);
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
};
