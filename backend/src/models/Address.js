import { Model } from 'objection';
import Location from './Location';

class Address extends Model {
  static get tableName() {
    return 'Address';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['postcode'],

      properties: {
        address_id: { type: 'integer' },
        branch_id: { type: 'integer' },
        address_line: { type: 'string', minLength: 1, maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        postcode: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass:`${__dirname}/Branch`,
        join: {
          from: 'Address.branch_id',
          to: 'Branch.branch_id'
        }
      },
      location: {
          relation: Model.HasManyRelation,
          modelClass: Location,
          join: {
              from: 'Address.address_id',
              to: 'Location.address_id'
          }
      }
    };
 }
}

module.exports = Address;