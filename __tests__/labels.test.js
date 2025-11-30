import Label from '../server/models/Label.cjs';
import { Model } from 'objection';
import * as knexConfig from '../knexfile.js';
import knex from 'knex';

// Using test configuration

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
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

// Using test configuration
const db = knex(knexConfig.test);
Model.knex(db);

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
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
