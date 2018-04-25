import { Model } from 'objection';
import Branch from './Branch';


export default class Organisation extends Model {
  static get tableName() {
    return 'Organisation';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['org_name'],

      properties: {
        id: { type: 'integer' },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        email_address: { type: 'string', minLength: 1, maxLength: 255 },
        telephone: { type: 'string', minLength: 1, maxLength: 16 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      branch: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Branch,
        join: {
          from: 'Organisation.id',
          to: 'Branch.org_id'
        }
      },
      users: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Branch,
        join: {
          from: 'Organisation.id',
          to: 'Users.org_id'
        }
      }
    };
  }
}
