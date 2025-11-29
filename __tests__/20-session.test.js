import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';
import fastify from 'fastify';
import init from '../server/plugin.js';
import User from '../server/models/User.js';
import { faker } from '@faker-js/faker';

let app;
let knex;

beforeAll(async () => {
  app = fastify({ logger: false });
  await init(app);
  knex = app.objection.knex;
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('users').truncate();
});

afterAll(async () => {
  await app.close();
  await knex.destroy();
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
