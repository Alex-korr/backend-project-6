// Скрипт для вывода всех задач с реляциями в консоль в виде объекта

const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const Task = require('../server/models/Task.cjs');
const TaskStatus = require('../server/models/TaskStatus.cjs');
const User = require('../server/models/User.cjs');

async function main() {
  const knex = Knex(knexConfig.development);
  Model.knex(knex);
  const tasks = await Task.query().withGraphFetched('[status, labels, executor, creator]');
  console.dir(tasks, { depth: 10 });
  await knex.destroy();
}

main().catch((err) => {
  process.exit(1);
});
