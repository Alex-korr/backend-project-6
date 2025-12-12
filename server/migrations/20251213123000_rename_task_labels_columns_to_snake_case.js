export async function up(knex) {
  return knex.schema.alterTable('task_labels', (table) => {
    table.renameColumn('taskId', 'task_id');
    table.renameColumn('labelId', 'label_id');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('task_labels', (table) => {
    table.renameColumn('task_id', 'taskId');
    table.renameColumn('label_id', 'labelId');
  });
}
