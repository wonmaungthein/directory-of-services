import { Model } from 'objection';
import Service from './Service';
import Address from './Address';

class Branch extends Model {
  static get tableName() {
    return 'Branch';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['borugh'],

      properties: {
        org_id: { type: 'integer' },
        branch_id: { type: 'integer' },
        borugh: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      organisation: {
        relation: Model.BelongsToOneRelation,
        modelClass:`${__dirname}/Organisation`,
        join: {
          from: 'Branch.org_id',
          to: 'Organisation.org_id'
        }
      },

      service: {
        relation: Model.HasManyRelation,
        modelClass: Service,
        join: {
          from: 'Branch.branch_id',
          to: 'Service.branch_id'
        }
      },

      address: {
          relation: Model.HasManyRelation,
          modelClass: Address,
          join: {
              from: 'Branch.branch_id',
              to: "Address.branch_id"
          }
      }
    };
  }
}

module.exports = Branch;