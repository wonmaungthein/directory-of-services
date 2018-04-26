import { Model } from 'objection';

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
}
