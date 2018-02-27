import { Model } from 'objection';

class Service extends Model {
  static get tableName() {
    return 'Service';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['service_Type'],

      properties: {
        service_id: { type: 'integer' },
        branch_id: { type: 'integer' },
        service_Type: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass:`${__dirname}/Branch`,
        join: {
          from: 'Service.branch_id',
          to: 'Branch.branch_id'
        }
      }
    };
 }
}

module.exports = Service;
