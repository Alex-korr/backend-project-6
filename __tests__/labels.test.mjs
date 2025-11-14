
import { test, expect } from 'vitest';
import Label from '../server/models/Label.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { Model } from 'objection';


// Initialize knex and bind to model before tests
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(db);

// Run migrations before all tests
import { beforeAll } from 'vitest';
beforeAll(async () => {
  await db.migrate.latest();
});

test('Create label using model', async () => {
  // Create a label
  const label = await Label.query().insert({ name: 'bug' });
  // Check label exists and has correct name
  expect(label).toBeDefined();
  expect(label.name).toBe('bug');
});
