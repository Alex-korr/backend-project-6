export async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('role').notNullable().defaultTo('user');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
  });
}
