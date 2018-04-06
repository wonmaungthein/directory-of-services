import { Model } from 'objection';

export default class Users extends Model {
  static get tableName() {
    return {
      tableName: 'Users',
      hasSecurePassword: true
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['salt_password', 'username'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        salt_password: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}
