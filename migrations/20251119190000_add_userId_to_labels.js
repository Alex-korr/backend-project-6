export async function up(knex) {
  return knex.schema.alterTable('labels', (table) => {
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('labels', (table) => {
    table.dropColumn('userId');
  });
}
