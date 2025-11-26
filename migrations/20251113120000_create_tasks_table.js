// ...existing code from server/migrations/20251113120000_create_tasks_table.jsexport async function up(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.integer('statusId').notNullable().references('id').inTable('task_statuses').onDelete('RESTRICT');
    table.integer('executorId').nullable().references('id').inTable('users').onDelete('SET NULL');
    table.integer('creatorId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('tasks');
}
