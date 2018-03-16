import { Model } from 'objection';
import Categories from './Categories';

export default class Service extends Model {
  static get tableName() {
    return 'Service';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['service_name', 'process'],

      properties: {
        service_id: { type: 'integer' },
        branch_id: { type: ['integer', 'null'] },
        service_days: { type: 'string', minLength: 1, maxLength: 255 },
        process: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      branch: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Categories,
        join: {
          from: 'Service.service_id',
          to: 'Categories.service_id'
        }
      }
    }
  }
}
