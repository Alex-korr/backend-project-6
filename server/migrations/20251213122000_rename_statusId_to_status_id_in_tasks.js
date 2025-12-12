export async function up(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('statusId', 'status_id');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('status_id', 'statusId');
  });
}
