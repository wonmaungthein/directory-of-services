
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
      table
        .integer('cat_id')
        .unsigned()
        .references('cat_id')
        .inTable('Categories');
      table.string('service_days');
      table.string('process');
    })
    .createTable('Categories', (table) => {
      table.increments('cat_id').primary();
      table.string('cat_name');
    })
    .createTable('Address', (table) => {
      table.increments('address_id').primary();
      table
        .integer('branch_id')
        .unsigned()
        .references('branch_id')
        .inTable('Branch');
      table.string('address_line');
      table.string('area');
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
    })
    .createTable('Users', (table) => {
      table.increments('user_id').primary();
      table.string('username');
      table.string('salt_password');
      table.date('last_updated');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('Organisation')
    .dropTableIfExists('Branch')
    .dropTableIfExists('Service')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Address')
<<<<<<< HEAD:backend/migrations/20180221120555_create_all_tables.js
    .dropTableIfExists('Location')
    .dropTableIfExists('Users')
=======
    .dropTableIfExists('Location');

>>>>>>> API-service:backend/db/migrations/20180308173243_create_all_tables.js
