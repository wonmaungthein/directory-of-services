import { Model } from 'objection';
import Branch from './Branch';

export default class Organisation extends Model {
  static get tableName() {
    return 'organisation';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['org_id'],

      properties: {
        org_id: { type: 'integer' },
        branch_id: { type: ['integer', 'null'] },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        email_address: { type: 'string', minLength: 1, maxLength: 255 },
        telephone: { type: 'integer', minLength: 1, maxLength: 16 },
      },
    };
  };

  // This object defines the relations to other models.
  static relationMappings = {
    branch: {
      relation: Model.HasManyRelation,
      // The related model. 
      modelClass: Branch,
      join: {
        from: 'Organisation.org_id',
        to: 'Branch.branch_id'
      }
    }
  };

}
