import { Model } from 'objection';
import Service from './Service';
import Address from './Address';
import Organisation from './Organisation';

export default class Branch extends Model {
  static get tableName() {
    return 'Branch';
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        org_id: { type: ['integer', 'null'] },
        borough: { type: 'string' },
        project: { type: 'string' },
        tag: { type: 'string' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organisation,
        join: {
          from: 'Branch.org_id',
          to: 'Organisation.id'
        }
      },
      service: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Service,
        join: {
          from: 'Branch.id',
          to: 'Service.branch_id'
        }
      },
      address: {
        relation: Model.HasManyRelation,
        // The related model.
        modelClass: Address,
        join: {
          from: 'Branch.id',
          to: 'Address.branch_id'
        }
      }
    };
  }
}
