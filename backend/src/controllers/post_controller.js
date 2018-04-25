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

const editOrganisation = async (graph, orgId) => {
  if (Array.isArray(graph)) {
    throw createStatusCodeError(400);
  }
  graph.id = parseInt(orgId, 10);
  const upsertedGraph = await transaction(Organisation.knex(), trx => {
    return (
      Organisation.query(trx)
        .allowUpsert('[branch, branch.[address, address.[location] service, service.[categories]] ]')
        .upsertGraph(graph)
    );
  });
  return upsertedGraph;
}

module.exports = {
  postOrganisation,
  editOrganisation
}
