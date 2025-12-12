export async function up(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('creatorId', 'creator_id');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('tasks', (table) => {
    table.renameColumn('creator_id', 'creatorId');
  });
}
