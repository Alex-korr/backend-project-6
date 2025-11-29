import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { buildApp } from '../server/app.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';


let db;
let app;
let authCookie;
let testUser;
let statusId;
let taskId;

beforeAll(async () => {
  db = knex(knexConfig[process.env.NODE_ENV || 'development']);
  app = buildApp({ knexInstance: db });
  await db.migrate.latest();
  await app.ready();
  // Create test user with hashed password
  const password = 'testpass123';
  const hashedPassword = await bcrypt.hash(password, 10);
  const [userId] = await db('users').insert({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: hashedPassword,
  });
  testUser = { id: userId, email: 'test@example.com', password };
  // Create test status
  [statusId] = await db('task_statuses').insert({ name: 'New' });
  // Log in and get session cookie
  const loginRes = await supertest(app.server)
    .post('/session')
    .type('form')
    .send({ email: testUser.email, password: testUser.password });
  // Use only the sessionId cookie string for all requests
  authCookie = loginRes.headers['set-cookie']?.[0]?.split(';')[0];
});

afterAll(async () => {
  await app.close();
  await db.destroy();
});

// Tasks CRUD tests removed, only filtering tests remain

describe('Tasks filtering', () => {
  let secondStatusId;
  let secondUserId;
  let labelId;
  let filterTaskId;

  beforeAll(async () => {
    // Create second status
    [secondStatusId] = await db('task_statuses').insert({ name: 'In Progress' });
    // Create second user
    const [userId] = await db('users').insert({
      firstName: 'Second',
      lastName: 'User',
      email: 'second@example.com',
      password: await bcrypt.hash('secondpass', 10),
    });
    secondUserId = userId;
    // Create label
    [labelId] = await db('labels').insert({ name: 'Urgent' });
    // Create task with second status, second user, and label
    const [id] = await db('tasks').insert({
      name: 'Filter Task',
      description: 'Should be found by filter',
      statusId: secondStatusId,
      creatorId: testUser.id,
      executorId: secondUserId,
    });
    filterTaskId = id;
    // Attach label
    await db('task_labels').insert({ taskId: filterTaskId, labelId });
  });

  it('Filter by status', async () => {
    const response = await supertest(app.server)
      .get('/tasks')
      .query({ status: secondStatusId })
      .set('Cookie', authCookie);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Filter Task');
    expect(response.text).not.toContain('Task 1');
  });

  it('Filter by executor', async () => {
    const response = await supertest(app.server)
      .get('/tasks')
      .query({ executor: secondUserId })
      .set('Cookie', authCookie);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Filter Task');
  });

  it('Filter by label', async () => {
    const response = await supertest(app.server)
      .get('/tasks')
      .query({ label: labelId })
      .set('Cookie', authCookie);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Filter Task');
  });

  it('Filter by author (my)', async () => {
    const response = await supertest(app.server)
      .get('/tasks')
      .query({ my: 'on' })
      .set('Cookie', authCookie);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Filter Task');
  });
});
