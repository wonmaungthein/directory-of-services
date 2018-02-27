import { Model } from 'objection';

class Location extends Model {
  static get tableName() {
    return 'Location';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        address_id: { type: 'integer' },
        lat: { type: 'string', minLength: 1, maxLength: 255 },
        long: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static get relationMappings() {
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass:`${__dirname}/Address`,
        join: {
          from: 'Location.address_id',
          to: 'Address.address_id'
        }
      }
    }
  }
}

module.exports = Location;
