export async function up(knex) {
  return knex.schema.alterTable('labels', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('labels', (table) => {
    table.dropColumn('user_id');
  });
}
