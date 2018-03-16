
import { transaction, Model } from 'objection';
import joinjs from 'join-js';
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

const resultMaps = [
  {
    mapId: 'orgMap',
    idProperty: 'org_id',
    properties: ['Organisation'],
    collections: [
      { name: 'branch', mapId: 'branchMap', columnPrefix: 'branch_' }
    ]
  },
  {
    mapId: 'branchMap',
    idProperty: 'branch_id',
    properties: ['borough']
  }
];

const Select = () => {
  // // const responce = knex.from('Organisation')
  // //   .innerJoin('Branch', 'Organisation.org_id', 'Branch.org_id')
  // //   // .innerJoin('Service', 'Branch.branch_id', 'Service.branch_id')
  // //   // .innerJoin('Address', 'Branch.branch_id', 'Address.branch_id')
  // //   // .innerJoin('Location', 'Address.address_id', 'Location.address_id')

  return knex
    .select(
      'o.org_id as org_org_id',
      'o.org_name as org_Organisation',
      'b.branch_id as branch_branch_id',
      'b.borough as branch_borough'
    )
    .from('Organisation as o')
    .innerJoin('Branch as b', 'b.org_id', 'o.org_id')
    .then(resultSet => {
      return joinjs.map(resultSet, resultMaps, 'orgMap', 'org_');
    });

};

module.exports = {
  Insert,
  Select
};
