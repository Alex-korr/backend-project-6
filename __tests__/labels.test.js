import { beforeAll, describe, it, expect } from '@jest/globals';
import Label from '../server/models/Label.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { Model } from 'objection';

// Using test configuration
const db = knex(knexConfig.test);
Model.knex(db);

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
  setTimeout(() => process.exit(0), 100);
});

describe('Label model', () => {
  it('Create label using model', async () => {
    // Create a label
    const label = await Label.query().insert({ name: 'bug' });
    // Check label exists and has correct name
    expect(label).toBeDefined();
    expect(label.name).toBe('bug');
  });
});
