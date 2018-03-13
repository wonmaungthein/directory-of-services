import { Model } from 'objection';
import Service from './Service';

export default class Categories extends Model {
  static get tableName() {
    return 'Categories';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['cat_name'],

      properties: {
        cat_id: { type: 'integer' },
        service_id: { type: ['integer', 'null'] },
        cat_name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  // This object defines the relations to other models.
  static relationMappings = {
    service: {
      relation: Model.HasManyRelation,
      // The related model.
      modelClass: Service,
      join: {
        from: 'Categories.cat_id',
        to: 'Service.service_id'
      }
    }
  }
}
