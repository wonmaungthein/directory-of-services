
import { transaction } from 'objection';
import Organisation from '../models/Organisation';

const knex = Organisation.knex();

const Add = async (data) => {
    let trx
    try {
      trx = await transaction.start(knex);
      const organisation = await Organisation
        .query(trx)
        .insert(data);
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.log('Something went wrong. Data is not inserted', err);
    }
  }

module.exports = {
    Add
}