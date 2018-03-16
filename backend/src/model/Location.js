import { Model } from 'objection';
import Address from './Address';

export default class Location extends Model {
  static get tableName() {
    return 'Location';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['lat', 'long'],

      properties: {
        location_id: { type: 'integer' },
        address_id: { type: ['integer', 'null'] },
        lat: { type: 'string', minLength: 1, maxLength: 255 },
        long: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}
