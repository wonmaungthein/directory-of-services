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
<<<<<<< HEAD
      table.string('service_Type');
=======
      table.string('service_name');
      table.string('service_days');
      table.string('process');
>>>>>>> 2c358df62a12a32708d62c62196fc337c0c0643e
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
<<<<<<< HEAD
      table.string('long');
=======
      table.string('lng');
>>>>>>> 2c358df62a12a32708d62c62196fc337c0c0643e
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('Organisation')
    .dropTableIfExists('Branch')
    .dropTableIfExists('Service')
    .dropTableIfExists('Address')
    .dropTableIfExists('Location');
