import { Model } from 'objection';

export default class Organisation extends Model {
  static tableName = 'organisation';
  // static jsonSchema = {
  //   type: 'object',
  //   required: ['org_id'],

  //   properties: {
  //     org_id: { type: 'integer' },
  //     ownerId: { type: ['integer', 'null'] },
  //     org_name: { type: 'string', minLength: 1, maxLength: 255 },
  //     website: { type: 'string', minLength: 1, maxLength: 255 },
  //     email_address: { type: 'string', minLength: 1, maxLength: 255 },
  //     telephone: { type: 'string', minLength: 1, maxLength: 255 },
  //   },

  // This object defines the relations to other models.
  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one. We use the file path version
      // here to prevent require loops.
      modelClass: `${__dirname}/Person`,
      join: {
        from: 'Animal.ownerId',
        to: 'Person.id',
      },
    },
  };
}
