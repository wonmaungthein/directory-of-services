import { Model } from 'objection';
import Address from './Address';

export default class Location extends Model {
  static get tableName() {
    return 'Location';
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        address_id: { type: ['integer', 'null'] },
        lat: { type: 'string' },
        long: { type: 'string' }
      }
    };
  }
  static get relationMappings() {
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        // The related model.
        modelClass: Address,
        join: {
          from: 'Location.address_id',
          to: 'Address.id'
        }
      }
    }
  }
}
