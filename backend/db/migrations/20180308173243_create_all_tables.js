
exports.up = knex =>
  knex.schema
    .createTable('Organisation', (table) => {
      table.increments('org_id').primary();
      table.string('org_name');
      table.string('website');
      table.string('email_address');
      table.string('telephone');
    })
    .createTable('Branch', (table) => {
      table.increments('branch_id').primary();
      table
        .integer('org_id')
        .unsigned()
        .references('org_id')
        .inTable('Organisation');
      table.string('borough');
    })
    .createTable('Service', (table) => {
      table.increments('service_id').primary();
      table
        .integer('branch_id')
        .unsigned()
        .references('branch_id')
        .inTable('Branch');
      table.string('service_name');
      table.string('service_days');
      table.string('process');
    })
    .createTable('Address', (table) => {
      table.increments('address_id').primary();
      table
        .integer('branch_id')
        .unsigned()
        .references('branch_id')
        .inTable('Branch');
      table.string('address_line');
      table.string('city');
      table.string('postcode');
    })
    .createTable('Location', (table) => {
      table.increments('location_id').primary();
      table
        .integer('address_id')
        .unsigned()
        .references('address_id')
        .inTable('Address');
      table.string('lat');
      table.string('long');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('Organisation')
    .dropTableIfExists('Branch')
    .dropTableIfExists('Service')
    .dropTableIfExists('Address')
    .dropTableIfExists('Location');

