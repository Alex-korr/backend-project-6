
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import fastify from 'fastify';
import init from '../server/plugin.js';
import * as knexConfig from '../knexfile.js';
import User from '../server/models/User.cjs';
import { faker } from '@faker-js/faker';

let app;
let knex;

beforeEach(async () => {
  app = fastify({ logger: false });
  app = await init(app);
  if (!app.objection) throw new Error('app.objection is not defined after init(app)');
  await app.ready();
  knex = app.objection.knex;
  await knex.migrate.latest();
  await knex('users').truncate();
});

afterEach(async () => {
  await app.close();
  await knex.destroy();
  await new Promise(resolve => setTimeout(resolve, 50));
});

describe('test session', () => {
  it('sign in / sign out', async () => {
    const password = faker.internet.password();
    const user = await User.query().insert({
      email: faker.internet.email(),
      password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    expect(user).toBeDefined();
  });
});
