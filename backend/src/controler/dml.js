
import { transaction } from 'objection';
import Organisation from '../models/Organisation';

const knex = Organisation.knex();
const Add = async (data) => {
  console.log(data)
    let trx
    try {
      trx = await transaction.start(knex);
      const organisation = await Organisation
        .query(trx)
        .insertGraph(data);
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.log('Something went wrong. Data is not inserted', err);
    }
  }

module.exports = {
    Add
}