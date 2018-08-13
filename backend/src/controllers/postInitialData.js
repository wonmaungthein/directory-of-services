import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';
import originalData from '../../data/data.json';

Model.knex(knex);

function seedData() {
  return originalData.map(row => {
    const branchData = {
      org_name: row.name || '',
      website: row.branches[0].Website || '',
      branch: row.branches.map(branch =>
        ({
          borough: branch.Borough || '',
          project: branch.Project || '',
          tag: branch.Tag || '',
          clients: branch.Clients || '',
          service: [
            {
              service: branch.Services || '',
              service_days: branch.Days.join(',') || '',
              process: branch.Process || '',
              categories: [
                {
                  cat_name: branch.Categories || ''
                }
              ]
            }
          ],
          address: [
            {
              area: branch.Area || '',
              address_line: branch.Address || '',
              postcode: branch.Postcode || '',
              email_address: branch.Email || '',
              telephone: `${branch.Tel}` || '',
              location: [
                {
                  lat: `${branch.lat}` || '',
                  long: `${branch.long}` || ''
                }
              ]
            }
          ]
        }))
    }
    return (async () => {
      try {
        return transaction(Organisation.knex(), async trx => {
          const savedData = await Organisation.query(trx).insertGraph(branchData);
          return savedData;
        })
      } catch (err) {
        return err;
      }
    })();
  })
}

module.exports = { seedData };
