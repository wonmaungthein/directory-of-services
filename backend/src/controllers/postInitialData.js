import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';
import benefitData from '../../data.json'

Model.knex(knex);

const loadSeedToDb = async () => {
  const data = await benefitData.map(row => {
    const d = {
      org_name: row.name || 'not provided',
      website: row.branches[0].Website || 'not provided',
      branch: row.branches.map(branch => {
        return {
          borough: branch.Borough || 'not provided',
          service: [{
            service_days: branch.Day.join() || 'not provided',
            process: branch.Process.join() || 'not provided ',
            categories: [{
              cat_name: branch.Category || 'not provided'
            }]
          }],
          address: [{
            area: branch.Area || 'not provided',
            address_line: 'not provided',
            postcode: branch.Postcode || 'not provided',
            email_address: branch.Email || 'notprovided@cyf.com',
            telephone: branch.Tel.join() || 'not provided',
            location: [{
              lat: 'not provided',
              long: 'not provided'
            }]
          }]
        }
      })
    };
    (async () => transaction(Organisation.knex(), trx => 
      Organisation
        .query(trx)
        .insertGraph(d))
    )();
  });
  return data;
}

module.exports = { loadSeedToDb }
