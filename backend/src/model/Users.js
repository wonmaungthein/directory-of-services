import { Model } from 'objection';
import Organisation from './Organisation';

export default class Users extends Model {
  static get tableName() {
    return 'Users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['salt_password', 'username', 'email', 'fullname'],

      properties: {
        id: { type: 'integer' },
        organisation: { type: 'string', minLength: 1, maxLength: 255 },
        fullname: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'email', minLength: 1, maxLength: 255 },
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
