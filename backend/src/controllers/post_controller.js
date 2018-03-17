import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';

Model.knex(knex);

const postOrganisation = async (graph) => {
  const insertedGraph = await transaction(Organisation.knex(), trx => {
    return (
      Organisation.query(trx)
        .insertGraph(graph)
    );
  });
  return insertedGraph;
};

module.exports = {
  postOrganisation
}
