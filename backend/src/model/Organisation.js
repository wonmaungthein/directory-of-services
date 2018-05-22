import { Model } from 'objection';
import Branch from './Branch';
import Users from './Users';


export default class Organisation extends Model {
  static get tableName() {
    return 'Organisation';
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        org_name: { type: 'string' },
        website: { type: 'string' },
        email_address: { type: 'string' },
        telephone: { type: 'string' }
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
        modelClass: Users,
        join: {
          from: 'Organisation.id',
          to: 'Users.org_id'
        }
      }
    };
  }
}
