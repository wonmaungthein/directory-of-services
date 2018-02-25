import { Model } from 'objection';

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
        // ownerId: { type: ['integer', 'null'] },
        org_name: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        email_address: { type: 'string', minLength: 1, maxLength: 255 },
        telephone: { type: 'integer', minLength: 1, maxLength: 16 },
      },
    };
  }
}
