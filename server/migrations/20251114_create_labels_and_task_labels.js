export async function up(knex) {
  await knex.schema.createTable('labels', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
  });

  await knex.schema.createTable('task_labels', (table) => {
    table.integer('taskId').unsigned().notNullable().references('id')
      .inTable('tasks')
      .onDelete('CASCADE');
    table.integer('labelId').unsigned().notNullable().references('id')
      .inTable('labels')
      .onDelete('CASCADE');
    table.primary(['taskId', 'labelId']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('task_labels');
  await knex.schema.dropTableIfExists('labels');
}
