import { Model } from 'objection';
import connectKnex from '../../config/knexFile';
import Branch from './Branch';

Model.knex(connectKnex);

class Organisation extends Model {
  static get tableName() {
    return 'Organisation';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['org_name'],

      properties: {
        org_id: { type: 'integer' },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        email_address: { type: 'string', minLength: 1, maxLength: 255 },
        telephone: { type: 'string', minLength: 1, maxLength: 16 }
      }
    };
  }

  static get relationMappings() {
    return {
      branch: {
        relation: Model.HasManyRelation,
        modelClass: Branch,
        join: {
          from: 'Organisation.org_id',
          to: 'Branch.org_id'
        }
      }
    };
  }
}

module.exports = Organisation;
