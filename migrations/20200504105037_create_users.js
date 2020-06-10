const TABLE = 'users';

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(TABLE).then((exists) => {
    return knex.schema.createTable(TABLE, (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password');
      table.string('email');
      table.string('name');
      table.string('role').defaultTo('user');
    });
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(TABLE);
};
