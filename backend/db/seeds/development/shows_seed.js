const faker = require('faker');

const orgData = () => {
  const org = [];
  for (let i = 0; i <= 10; i++) {
    org.push({
      org_name: faker.name.firstName(),
      website: faker.internet.email(),
      email_address: faker.internet.email(),
      telephone: faker.name.lastName()
    })
  }
  return org;
}

const branchData = () => {
  const branch = [];
  for (let i = 0; i <= 10; i++) {
    branch.push({
      borough: faker.lorem.sentence()
    })
  }
  return branch;
}

const createOrg = (knex, table, data) =>
  knex(table).insert(data);

exports.seed = (knex) =>
  knex('Organisation').del()
    .then(() => knex('Branch').del()
      .then(() => knex('Service').del()
        .then(() => knex('Address').del()
          .then(() => knex('Location').del()
            .then(() => {
              const data = orgData();
              let orgPromises = [];
              orgPromises = data.map(org =>
                createOrg(knex, 'Organisation', org))
              return Promise.all(orgPromises);
            })
            .then(() =>
              knex('Organisation').select('org_id')
                .then(org => {
                  let branchPromises = [];
                  const branchDatas = branchData();
                  branchPromises = branchDatas.map((name, i) =>
                    createOrg(knex, 'Branch', { ...name, org_id: org[i].org_id }))
                  return Promise.all(branchPromises);
                })
      )))))
            // .then(() =>
            //   knex('Organisation').first()
            //     .then(org =>
            //       knex('Branch').insert({
            //         org_id: org.org_id,
            //         borough: faker.lorem.sentence()
            //       })))
            // .then(() =>
            //   knex('Branch').first()
            //     .then(branch =>
            //       knex('Service').insert({
            //         branch_id: branch.branch_id,
            //         service_name: faker.name.lastName(),
            //         service_days: faker.date.recent(),
            //         process: faker.lorem.sentence()
            //       })))
            // .then(() =>
            //   knex('Branch').first()
            //     .then(branch =>
            //       knex('Address').insert({
            //         branch_id: branch.branch_id,
            //         address_line: faker.address.streetName(),
            //         area: faker.address.city(),
            //         postcode: faker.address.zipCode()
            //       }))
            //     .then(() =>
            //       knex('Address').first()
            //         .then(address =>
            //           knex('Location').insert({
            //             address_id: address.address_id,
            //             lat: faker.address.latitude(),
            //             long: faker.address.longitude()
            //           })))))
                    
//                     ))))
// };

