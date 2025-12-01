import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import fastify from 'fastify';
import init from '../server/plugin.js';
import User from '../server/models/User.cjs';
import { faker } from '@faker-js/faker';

let app;
let knex;

beforeEach(async () => {
  app = fastify({ logger: false });
  await init(app);
  await app.ready();
  
  if (!app.objection) {
    throw new Error('app.objection is undefined. Check plugin initialization.');
  }
  
  knex = app.objection.knex;
  await knex.migrate.latest();
  await knex('users').truncate();
});

afterEach(async () => {
  await knex('users').truncate();
  await knex.destroy();
  await app.close();
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