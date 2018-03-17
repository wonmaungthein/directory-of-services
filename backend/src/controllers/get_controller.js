
import { Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';

Model.knex(knex);

const getAllOrgainisation = async () => {
  const result = await Organisation
    .query()
    .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]');
  return result;
}

module.exports = {
  getAllOrgainisation
};
