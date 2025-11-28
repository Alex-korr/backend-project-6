import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { buildApp, runServer } from '../server/app.js';
import { User } from '../server/models/User.js';
import { faker } from '@faker-js/faker';

let app;
let knex;

beforeAll(async () => {
  app = await buildApp();
  if (!app.objection || !app.objection.knex) {
    throw new Error('app.objection или app.objection.knex не определены после buildApp(). Проверьте реализацию buildApp и конфиг knex.');
  }
  knex = app.objection.knex;
  await runServer(app);
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('users').truncate();
});

describe('test session', () => {
  test('sign in / sign out', async () => {
    const password = faker.internet.password();
    const user = await User.query().insert({
      email: faker.internet.email(),
      password,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    // Здесь должен быть тест логики входа/выхода
    expect(user).toBeDefined();
  });
});
