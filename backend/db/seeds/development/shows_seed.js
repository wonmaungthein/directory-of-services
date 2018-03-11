
exports.seed = (knex) =>
  // Deletes ALL existing entries
  knex('Organisation').del()
    .then(() => knex('Branch').del()
      .then(() => knex('Service').del()
        .then(() => knex('Address').del()
          .then(() => knex('Location').del()
            .then(() =>
              knex('Organisation').insert({
                org_name: 'Community Link',
                website: 'http://www.community-links.org/local-services/advice/',
                email_address: 'Popes Lane',
                telephone: '020 7473 2270'
              }))
            .then(() =>
              knex('Organisation').first()
                .then(org =>
                  knex('Branch').insert({
                    org_id: org.org_id,
                    borough: 'Newham'
                  })))))))

  // knex('Service').del()
  //   .then(() => {
  //     knex('Service').insert({
  //       branch_id: 1,
  //       service_name: 'Benefits',
  //       service_days: 'Monday-Friday',
  //       process: 'Drop-in (arrive by 8.30am)'
  //     })
  //   })
  // knex('Address').del()
  //   .then(() => {
  //     knex('Address').insert({
  //       branch_id: 1,
  //       address_line: '567',
  //       area: 'West',
  //       postcode: 'E16 4HQ'
  //     })
  //   })
  // knex('Location').del()
  //   .then(() => {
  //     knex('Location').insert({
  //       address_id: 1,
  //       lat: '42.485093',
  //       long: '-71.43284'
  //     })
  //   });
