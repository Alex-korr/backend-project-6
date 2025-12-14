import Task from '../server/models/Task.cjs';
import { development } from '../knexfile.js';
import Knex from 'knex';

const knex = Knex(development);
Task.knex(knex);

(async () => {
  const task = await Task.query().findById(1).withGraphFetched('creator');
  // ...existing code...
  await knex.destroy();
})();
