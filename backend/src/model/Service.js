import { Model } from 'objection';
import Categories from './Categories';
import Branch from './Branch';

export default class Service extends Model {
  static get tableName() {
    return 'Service';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['service_days', 'process'],

      properties: {
        id: { type: 'integer' },
        branch_id: { type: ['integer', 'null'] },
        service_days: { type: 'string', minLength: 1, maxLength: 255 },
        process: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      categories: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Categories,
        join: {
          from: 'Service.id',
          to: 'Categories.service_id'
        }
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        // The related model.
        modelClass: Branch,
        join: {
          from: 'Service.branch_id',
          to: 'Branch.id'
        }
      }
    }
  }
}
