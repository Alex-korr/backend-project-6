import Knex from 'knex';
import Task from '../server/models/Task.cjs';
import { development } from '../knexfile.js';

const knex = Knex(development);
Task.knex(knex);


async function runDebugTaskCreator() {
  const task = await Task.query().findById(1).withGraphFetched('creator');
  // Можно добавить вывод или обработку task, если нужно
  await knex.destroy();
}

runDebugTaskCreator();
