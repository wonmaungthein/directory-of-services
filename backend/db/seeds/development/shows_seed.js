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

const loadOrganisation = (knex) => {
  const data = orgData();
  let orgPromises = [];
  orgPromises = data.map(org =>
    feedDataInToTables(knex, 'Organisation', org))
  return Promise.all(orgPromises);
}
const loadBranch = (knex, org) => {
  let branchPromises = [];
  const branchDatas = branchData();
  branchPromises = branchDatas.map((name, i) =>
    feedDataInToTables(knex, 'Branch', { ...name, org_id: org[i].id }))
  return Promise.all(branchPromises);
}
const loadCategories = (knex) => {
  const data = categoriesData();
  let catPromises = [];
  catPromises = data.map(cat =>
    feedDataInToTables(knex, 'Categories', cat))
  return Promise.all(catPromises);
}
const loadService = (knex, branch) => {
  let servicePromises = [];
  const serviceDatas = serviceData();
  servicePromises = serviceDatas.map((service, i) =>
    feedDataInToTables(knex, 'Service', { ...service, branch_id: branch[i].id }))
  return Promise.all(servicePromises);
}
const loadAddress = (knex, branch) => {
  let addressPromises = [];
  const addressDatas = addressData();
  addressPromises = addressDatas.map((address, i) =>
    feedDataInToTables(knex, 'Address', { ...address, branch_id: branch[i].id }))
  return Promise.all(addressPromises);
}
const loadLocation = (knex, address) => {
  let locationPromises = [];
  const locationDatas = locationData();
  locationPromises = locationDatas.map((location, i) =>
    feedDataInToTables(knex, 'Location', { ...location, address_id: address[i].id }))
  return Promise.all(locationPromises);
}
exports.seed = (knex) =>
  knex('Organisation').del()
    .then(() => knex('Branch').del()
      .then(() => knex('Service').del()
        .then(() => knex('Address').del()
          .then(() => knex('Location').del()
            .then(() => knex('Categories').del())))))
    .then(() =>
      loadOrganisation(knex))
    .then(() =>
      knex('Organisation').select('id')
        .then(org => loadBranch(knex, org)))
    .then(() => loadCategories(knex))
    .then(() =>
      knex('Branch').select('id')
        .then(branch => loadService(knex, branch)))
    .then(() =>
      knex('Branch').select('id')
        .then(branch => loadAddress(knex, branch)))
    .then(() =>
      knex('Address').select('id')
        .then(address => loadLocation(knex, address)))
    .then(() => knex.destroy())
