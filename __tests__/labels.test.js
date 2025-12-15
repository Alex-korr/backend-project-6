import knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../knexfile.js';
import Label from '../server/models/Label.cjs';
import User from '../server/models/User.cjs';

const db = knex(knexConfig.test);
Model.knex(db);

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('Label model', () => {
  it('Create label for user and check', async () => {
    // Create a test user
    const user = await User.query().insert({
      email: 'test@example.com',
      password: 'password123',
      first_name: 'Test',
      last_name: 'User',
    });
    // Create a label for this user
    const label = await Label.query().insert({ name: 'bug', user_id: user.id });
    // Check label exists and has correct name and user_id
    expect(label).toBeDefined();
    expect(label.name).toBe('bug');
    expect(label.user_id).toBe(user.id);
    // Fetch labels for user
    const labels = await Label.query().where('user_id', user.id);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0].name).toBe('bug');
  });
});
import Label from '../server/models/Label.cjs';
import User from '../server/models/User.cjs';
import { Model } from 'objection';
import * as knexConfig from '../knexfile.js';
import knex from 'knex';

const db = knex(knexConfig.test);
Model.knex(db);

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('Label model', () => {
  it('Create label for user and check', async () => {
    // Create a test user
    const user = await User.query().insert({
      email: 'test@example.com',
      password: 'password123',
      first_name: 'Test',
      last_name: 'User',
    });
    // Create a label for this user
    const label = await Label.query().insert({ name: 'bug', user_id: user.id });
    // Check label exists and has correct name and user_id
    expect(label).toBeDefined();
    expect(label.name).toBe('bug');
    expect(label.user_id).toBe(user.id);
    // Fetch labels for user
    const labels = await Label.query().where('user_id', user.id);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0].name).toBe('bug');
  });
});
