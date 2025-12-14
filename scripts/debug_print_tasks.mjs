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
  await knex.destroy();
}

main().catch((err) => {
  process.exit(1);
});
