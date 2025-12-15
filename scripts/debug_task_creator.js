import knex from 'knex';
import Task from '../server/models/Task.cjs';
import { development } from '../knexfile.js';


const db = knex(development);
Task.knex(db);

async function runDebugTaskCreator() {
  await Task.query().findById(1).withGraphFetched('creator');
  // You can add output or processing here if needed
  await db.destroy();
}

runDebugTaskCreator();
