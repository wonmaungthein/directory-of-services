
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('Categories', (t) => {
    t.varchar('cat_name').alter();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('Categories', (t) => {
    t.string('cat_name').alter();
  });
};
