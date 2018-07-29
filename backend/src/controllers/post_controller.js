import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';

Model.knex(knex);

const postOrganisation = async (graph) => {
  const insertedGraph = await transaction(Organisation.knex(), trx =>
    (
      Organisation.query(trx)
        .insertGraph(graph)
    ));
  return insertedGraph;
};





const deleteOrganisation = async (orgId, branchId, graph) => {
  console.log(branchId);
  
  const options = {
    unrelated: ['branch', 'branch.address', 'branch.address.location', 'branch.service', 'branch.sercice.categories'],
    noDelete: ['branch', 'branch.address', 'branch.address.location', 'branch.service', 'branch.sercice.categories']
  };

  try {
    if (Array.isArray(graph)) {
      throw Error;
    }
    graph.id = parseInt(orgId, 10);
    const upsertedGraph = await transaction(Organisation.knex(), trx =>
      Organisation.query(trx)
        .skipUndefined()
        .allowUpsert('[branch, branch.[address, address.[location] service, service.[categories]] ]')
        .upsertGraph(graph)
        .where('branch.id', 'like', branchId));
    return upsertedGraph;
  } catch (error) {
    console.log(error);
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
