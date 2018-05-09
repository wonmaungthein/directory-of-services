const { Model } = require('objection');
const { transaction } = require('objection');
const knex = require('../../../config');
const Organisation = require('../../../src/model/Organisation');
const data = require('../../../data.json');

Model.knex(knex);

const loadSeedToDb = async () => {
  const datas = await data.map(row => {
    const d = {
      org_name: row.name || 'not provided',
      website: row.branches[0].Website || 'not provided',
      branch: row.branches.map(branch => (
        {
          borough: branch.Borough || 'not provided',
          service: [{
            service: branch.Services || 'not provided ',
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
      ))
    };
    return async () => transaction(Organisation.knex(), trx =>
      Organisation
        .query(trx)
        .insertGraph(d))
  });
  return datas;
}
exports.seed = () => {
  loadSeedToDb();
}
