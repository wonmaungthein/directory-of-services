import { Model } from 'objection';
import connectKnex from '../../config/knexFile';

Model.knex(connectKnex);

class Organisation extends Model {
  static get tableName() {
    return 'Organisation';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['org_id'],

      properties: {
        org_id: { type: 'integer' },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        email_address: { type: 'string', minLength: 1, maxLength: 255 },
        telephone: { type: 'string', minLength: 1, maxLength: 16 }
      }
    };
  }
}

module.exports = Organisation;
