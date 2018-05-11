import { Model } from 'objection';
import Service from './Service';

export default class Categories extends Model {
  static get tableName() {
    return 'Categories';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      require: ['service_id', 'cat_name'],

      properties: {
        id: { type: 'integer' },
        service_id: { type: ['integer', 'null'] },
        cat_name: { type: 'string' }
      }
    }
  }
  static get relationMappings() {
    return {
      service: {
        relation: Model.BelongsToOneRelation,
        // The related model.
        modelClass: Service,
        join: {
          from: 'Categories.service_id',
          to: 'Service.id'
        }
      }
    }
  }
}
