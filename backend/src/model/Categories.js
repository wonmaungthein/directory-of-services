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
        cat_name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      service: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Service,
        join: {
          from: 'Categories.cat_id',
          to: 'Service.cat_id'
        }
      }
    };
  }

}
