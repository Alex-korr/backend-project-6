export async function up(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('executorId', 'executor_id');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('executor_id', 'executorId');
  });
}
