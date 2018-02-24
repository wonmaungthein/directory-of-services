const express = require('express');

const router = express.Router();

const Knex = require('knex');
const knexConfig = require('../knexfile');

const knex = Knex(knexConfig.development);

knex.migrate.latest().then(() => console.log('Migrated.'));

// wait

const Organisation = require('../models/Organisation').default;

const postOrganisation = () => {
  Organisation.query()
    .insertGraph({
      org_id: 333,
      org_name: 'fasdfas',
      website: 'website',
      email_address: 'McTesterson',
      telephone: 456446,

    })
    .then(result => result);
};
// Person.query()
//   .where('firstName', 'Testy')
//   .then(result => {
//     console.log('where found:');
//     console.dir(result);
//   });

/* GET api page. */
router.get('/', (req, res) => {
  res.json(postOrganisation);
});

module.exports = router;
