import { Model } from 'objection';
import Branch from './Branch';
import Location from './Location';

export default class Address extends Model {
    static get tableName() {
        return 'Address';
    }
    static get jsonSchema() {
        return {
            type: 'object',
          required: ['address_line', 'city', 'postcode'],

            properties: {
                address_id: { type: 'integer' },
                branch_id: { type: ['integer', 'null'] },
                adress_line: { type: 'string', minLength: 1, maxLength: 255 },
                city: { type: 'string', minLength: 1, maxLength: 255 },
                postcode: { type: 'string', minLength: 1, maxLength: 255 },
            },
        };
    };

    // This object defines the relations to other models.
    static relationMappings = {
        location: {
            relation: Model.HasManyRelation,
            // The related model. 
            modelClass: Location,
            join: {
                from: 'Address.address_id',
                to: 'Location.location_id'
            }
        },
        branch: {
            relation: Model.HasManyRelation,
            // The related model. 
            modelClass: Branch,
            join: {
                from: 'Address.address_id',
                to: 'Branch.branch_id'
            }
        }
    };
}


    
