// Tests for TaskStatus CRUD
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import app from '../server/index.js';
import supertest from 'supertest';
import knexConfig from '../knexfile.js';
import knex from 'knex';

const request = supertest(app.server);
const db = knex(knexConfig.development);


beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db('task_statuses').truncate();
});

describe('TaskStatus CRUD', () => {
  let cookie;

  // Миграции, регистрация и логин пользователя, ожидание готовности сервера
  beforeAll(async () => {
    await db.migrate.latest();
    await app.ready();
    await request
      .post('/users')
      .send('firstName=Test&lastName=User&email=test@example.com&password=123456')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const loginRes = await request
      .post('/session')
      .send('email=test@example.com&password=123456')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    cookie = loginRes.headers['set-cookie'];
  });

  it('should show statuses list', async () => {
    const res = await request.get('/statuses');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Statuses');
  });

});
