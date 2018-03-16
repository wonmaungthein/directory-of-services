
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
    properties: ['borough'],
    collections: [
      { name: 'address', mapId: 'addressMap', columnPrefix: 'address_' },
      { name: 'service', mapId: 'serviceMap', columnPrefix: 'service_' }
    ]
  },
  {
    mapId: 'addressMap',
    idProperty: 'address_id',
    properties: [
      'address_line',
      'area',
      'postcode'
    ],
    collections: [
      { name: 'location', mapId: 'locationMap', columnPrefix: 'location_' }
    ]
  },
  {
    mapId: 'serviceMap',
    idProperty: 'service_id',
    properties: [
      'days',
      'process'
    ],
    collections: [
      { name: 'categories', mapId: 'categoryMap', columnPrefix: 'categories_' }
    ]
  },
  {
    mapId: 'locationMap',
    idProperty: 'location_id',
    properties: [
      'latitude',
      'longitude'
    ]
  },
  {
    mapId: 'categoryMap',
    idProperty: 'categories_id',
    properties: [
      'categories_name'
    ]
  }
];

const Select = async () => {
  return knex
    .select(
      'org.org_id as org_org_id',
      'org.org_name as org_Organisation',
      'branch.branch_id as branch_branch_id',
      'branch.borough as branch_borough',
      'address.branch_id as address_branch_id',
      'address.address_id as address_address_id',
      'address.address_line as address_address_line',
      'address.area as address_area',
      'location.location_id as location_location_id',
      'location.lat as location_latitude',
      'location.long as location_longitude',
      'address.postcode as address_postcode',
      'service.branch_id as service_branch_id',
      'service.service_id as service_service_id',
      'service.service_days as service_days',
      'service.process as service_process',
      'categories.cat_id as categories_categories_id',
      'categories.cat_name as categories_categories_name',
      'categories.service_id as categories_service_id'
    )
    .from('Organisation as org')
    .leftOuterJoin('Branch as branch', 'branch.org_id', 'org.org_id')
    .leftOuterJoin('Address as address', 'address.branch_id', 'branch.branch_id')
    .leftOuterJoin('Location as location', 'location.address_id', 'address.address_id')
    .leftOuterJoin('Service as service', 'service.branch_id', 'branch.branch_id')
    .leftOuterJoin('Categories as categories', 'categories.service_id', 'service.service_id')
    .then(resultSet => {
      console.log(resultSet)
      return joinjs.map(resultSet, resultMaps, 'orgMap', 'org_');
    });

};

module.exports = {
  Insert,
  Select
};
