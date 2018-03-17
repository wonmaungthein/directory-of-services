
import { transaction, Model } from 'objection';
import joinjs from 'join-js';
import { knex } from '../../config';
import resultMaps from './allServiceMap';

Model.knex(knex);

const getAllOrgainisation = async () =>
  knex
    .select(
      'org.id as org_org_id',
      'org.org_name as org_Organisation',
      'branch.id as branch_branch_id',
      'branch.borough as branch_borough',
      'address.branch_id as address_branch_id',
      'address.id as address_address_id',
      'address.address_line as address_address_line',
      'address.area as address_area',
      'location.id as location_location_id',
      'location.lat as location_latitude',
      'location.long as location_longitude',
      'address.postcode as address_postcode',
      'service.branch_id as service_branch_id',
      'service.id as service_service_id',
      'service.service_days as service_days',
      'service.process as service_process',
      'categories.id as categories_categories_id',
      'categories.cat_name as categories_categories_name',
      'categories.service_id as categories_service_id'
    )
    .from('Organisation as org')
    .leftOuterJoin('Branch as branch', 'branch.org_id', 'org.id')
    .leftOuterJoin('Address as address', 'address.branch_id', 'branch.id')
    .leftOuterJoin('Location as location', 'location.address_id', 'address.id')
    .leftOuterJoin('Service as service', 'service.branch_id', 'branch.id')
    .leftOuterJoin('Categories as categories', 'categories.service_id', 'service.id')
    .then(resultSet =>
      joinjs.map(resultSet, resultMaps, 'orgMap', 'org_'))

module.exports = {
  getAllOrgainisation
};
