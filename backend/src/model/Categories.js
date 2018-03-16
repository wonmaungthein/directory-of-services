import { Model } from 'objection';
import Service from './Service';

export default class Categories extends Model {
  static get tableName() {
    return 'Categories';
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        cat_id: { type: 'integer' },
        service_id: { type: ['integer', 'null'] },
        cat_name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}
