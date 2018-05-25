import { Model } from 'objection';
import Branch from './Branch';
import Location from './Location';

export default class Address extends Model {
  static get tableName() {
    return 'Address';
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        branch_id: { type: ['integer', 'null'] },
        address_line: { type: 'string' },
        area: { type: 'string' },
        postcode: { type: 'string' },
        email_address: { type: 'string' },
        telephone: { type: 'string' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      location: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Location,
        join: {
          from: 'Address.id',
          to: 'Location.address_id'
        }
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        // The related model.
        modelClass: Branch,
        join: {
          from: 'Address.branch_id',
          to: 'Branch.id'
        }
      }
    };
  }
}
