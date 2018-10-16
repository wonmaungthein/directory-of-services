
exports.up = function(knex, Promise) {
    return knex.schema.table('Users', function(t) {
        t.boolean('hasRequestedEditor').notNullable().defaultTo(false);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.tableable('Users', function(t) {
        t.dropColumn('hasRequestedEditor');
      });
};
