import { Model } from 'objection';

export default class Users extends Model {
  static get tableName() {
    return 'Users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['salt_password', 'username', 'org_name'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        salt_password: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}
