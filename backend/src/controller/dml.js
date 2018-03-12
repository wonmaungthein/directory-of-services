
import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';

Model.knex(knex);

const org = Organisation.knex();

const Insert = async (query) => {
  let trx
  try {
    trx = await transaction.start(org);
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
  // const responce = knex.from('Organisation')
    // .innerJoin('Branch', 'Organisation.org_id', 'Branch.org_id')
    // .innerJoin('Service', 'Branch.branch_id', 'Service.branch_id')
    // .innerJoin('Address', 'Branch.branch_id', 'Address.branch_id')
    // .innerJoin('Location', 'Address.address_id', 'Location.address_id')
  const organisation = await Organisation
    .query()
    .eager('branch');
  return organisation;
};

module.exports = {
  Insert,
  Select
};
