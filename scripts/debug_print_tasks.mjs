// debug_print_tasks.mjs
// Скрипт для вывода всех задач с реляциями в консоль в формате ESM

import Knex from 'knex';
import { Model } from 'objection';
import { development as knexConfig } from '../knexfile.js';
import Task from '../server/models/Task.cjs';
import TaskStatus from '../server/models/TaskStatus.cjs';
import User from '../server/models/User.cjs';

async function main() {
  const knex = Knex(knexConfig);
  Model.knex(knex);
  const tasks = await Task.query().withGraphFetched('[status, labels, executor, creator]');
  console.dir(tasks, { depth: 10 });
  await knex.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
