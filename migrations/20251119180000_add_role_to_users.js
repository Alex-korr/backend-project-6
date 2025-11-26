// ...existing code from server/migrations/20251119180000_add_role_to_users.jsexport async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('role').notNullable().defaultTo('user');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
  });
}
