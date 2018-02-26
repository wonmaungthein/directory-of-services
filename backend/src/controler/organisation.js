
import { transaction } from 'objection';
import Organisation from '../models/Organisation';

const knex = Organisation.knex();
const Add = async (data) => {
    let trx
    try {
      trx = await transaction.start(knex);
      const organisation = await Organisation
        .query(trx)
        .insertGraph([{
          org_name: 'Best',
          website: 'www.///',
          email_address: 'Popes Lane',
          telephone: '12',

          branch: [
            {
              borugh: 'Hanslow',

              service: [{
                service_Type: 'LGBTQ'
              }],

              address: [{
                address_line: '251',
                city: "Acton",
                postcode: "W5 4NH",

                location: [{
                  lat: "42.485093",
                  long: "-71.43284"
                }]
              }]
          }],

        }
        ]);
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      console.log('Something went wrong. Data is not inserted', err);
    }
  }

module.exports = {
    Add
}