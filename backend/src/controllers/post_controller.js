import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';

const { raw } = require('objection');

Model.knex(knex);

const postOrganisation = async (graph) => {
  const insertedGraph = await transaction(Organisation.knex(), trx =>
    (
      Organisation.query(trx)
        .insertGraph(graph)
    ));
  return insertedGraph;
};

const deleteOrganisation = async (orgId, branchId) => {
  console.log(branchId)
  try {
    const deletedBranch = await Organisation.query()
      .delete()
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
      .where(raw('branch.id'), 'like', branchId)
    return deletedBranch;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editOrganisation = async (graph, orgId, branchId) => {
  const options = {
    relate: ['branch', 'branch.address', 'branch.address.location', 'branch.service', 'branch.sercice.categories'],
    noDelete: ['branch', 'branch.address', 'branch.address.location', 'branch.service', 'branch.sercice.categories']
  };

  if (Array.isArray(graph)) {
    throw Error;
  }
  graph.id = parseInt(orgId, 10);
  const upsertedGraph = await transaction(Organisation.knex(), trx =>
    Organisation.query(trx)
      .allowUpsert('[branch, branch.[address, address.[location] service, service.[categories]] ]')
      .upsertGraph(graph, options)
      .where('branch.id', 'like', branchId));

  return upsertedGraph;
}

module.exports = {
  postOrganisation,
  editOrganisation,
  deleteOrganisation
}
