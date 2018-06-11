import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';
import benefitData from '../../data.json';

Model.knex(knex);
const seedData = async () => {
  const data = await benefitData.map(row => {
    const branchData = {
      org_name: row.name || '',
      website: row.branches[0].Website || '',
      branch: row.branches.map(branch => ({
        borough: branch.Borough || '',
        project: branch.project || '',
        tag: branch.tag || '',
        service: [
          {
            service: branch.Services || '',
            service_days: branch.Day || '',
            process: branch.Process || '',
            categories: [
              {
                cat_name: branch.categories || ''
              }
            ]
          }
        ],
        address: [
          {
            area: branch.Area || '',
            address_line: '' || '',
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
    };
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
  });
  return data;
};

module.exports = { seedData };
