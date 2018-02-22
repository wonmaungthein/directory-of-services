import { Model } from 'objection';
import Branch from './Branch';
import Service from './Service';
import Address from './Address';

export default class Branch extends Model {
    static get tableName() {
        return 'Branch';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: [' branch_id'],

            properties: {
                branch_id: { type: 'integer' },
                org_id: { type: ['integer', 'null'] },
                borough: { type: 'string', minLength: 1, maxLength: 255 }
            },
        };
    };

    // This object defines the relations to other models.
    static relationMappings = {
        service: {
            relation: Model.HasManyRelation,
            // The related model. 
            modelClass: Service,
            join: {
                from: 'Branch.branch_id',
                to: 'Service.service_id'
            }
        },
        address: {
            relation: Model.HasManyRelation,
            // The related model. 
            modelClass: Address,
            join: {
                from: 'Branch.branch_id',
                to: 'Address.address_id'
            }
        }
    };
}