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
      required: ['address_line', 'area', 'postcode'],

      properties: {
        id: { type: 'integer' },
        branch_id: { type: ['integer', 'null'] },
        address_line: { type: 'string', minLength: 1, maxLength: 255 },
        area: { type: 'string', minLength: 1, maxLength: 255 },
        postcode: { type: 'string', minLength: 1, maxLength: 255 }
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
    }
  }
  $beforeInsert() {
    console.log('$beforeInsert', this.constructor.tableName);
  }
}
