import { Model } from 'objection';
import Organisation from './Organisation';

export default class Users extends Model {
  static get tableName() {
    return 'Users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['salt_password', 'username', 'org_id'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        org_id: { type: 'integer' },
        salt_password: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }


  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organisation,
        join: {
          from: 'Users.org_id',
          to: 'Organisation.id'
        }
      }
    }
  }
}
