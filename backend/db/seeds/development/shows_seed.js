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

const serviceData = () => {
  const service = [];
  for (let i = 0; i <= 10; i++) {
    service.push({
      // service_name: faker.name.lastName(),
      service_days: faker.date.recent(),
      process: faker.lorem.sentence()
    })
  }
  return service;
}

const categoriesData = () => {
  const categories = [];
  for (let i = 0; i <= 10; i++) {
    categories.push({
      cat_name: faker.lorem.sentence()
    })
  }
  return categories;
}

const addressData = () => {
  const address = [];
  for (let i = 0; i <= 10; i++) {
    address.push({
      address_line: faker.address.streetName(),
      area: faker.address.city(),
      postcode: faker.address.zipCode()
    })
  }
  return address;
}

const locationData = () => {
  const location = [];
  for (let i = 0; i <= 10; i++) {
    location.push({
      lat: faker.address.latitude(),
      long: faker.address.longitude()
    })
  }
  return location;
}

const feedDataInToTables = (knex, table, data) =>
  knex(table).insert(data);

exports.seed = (knex) =>
  knex('Organisation').del()
    .then(() => knex('Branch').del()
      .then(() => knex('Service').del()
        .then(() => knex('Address').del()
          .then(() => knex('Location').del()
            .then(() => knex('Categories').del()
              .then(() => {
                const data = orgData();
                let orgPromises = [];
                orgPromises = data.map(org =>
                  feedDataInToTables(knex, 'Organisation', org))
                return Promise.all(orgPromises);
              })
              .then(() =>
                knex('Organisation').select('org_id')
                  .then(org => {
                    let branchPromises = [];
                    const branchDatas = branchData();
                    branchPromises = branchDatas.map((name, i) =>
                      feedDataInToTables(knex, 'Branch', { ...name, org_id: org[i].org_id }))
                    return Promise.all(branchPromises);
                  }))
              .then(() => {
                const data = categoriesData();
                let catPromises = [];
                catPromises = data.map(cat =>
                  feedDataInToTables(knex, 'Categories', cat))
                return Promise.all(catPromises);
              })
              .then(() =>
                knex('Branch').select('branch_id')
                  .then(branch => {
                    let servicePromises = [];
                    const serviceDatas = serviceData();
                    servicePromises = serviceDatas.map((service, i) =>
                      feedDataInToTables(knex, 'Service', { ...service, branch_id: branch[i].branch_id }))
                    return Promise.all(servicePromises);
                  }))
              .then(() =>
                knex('Branch').select('branch_id')
                  .then(branch => {
                    let addressPromises = [];
                    const addressDatas = addressData();
                    addressPromises = addressDatas.map((address, i) =>
                      feedDataInToTables(knex, 'Address', { ...address, branch_id: branch[i].branch_id }))
                    return Promise.all(addressPromises);
                  })
                  .then(() =>
                    knex('Address').select('address_id')
                      .then(address => {
                        let locationPromises = [];
                        const locationDatas = locationData();
                        locationPromises = locationDatas.map((location, i) =>
                          feedDataInToTables(knex, 'Location', { ...location, address_id: address[i].address_id }))
                        return Promise.all(locationPromises);
                      }))))))))
