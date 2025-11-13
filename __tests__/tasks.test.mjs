import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { buildApp } from '../server/app.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const app = buildApp({ knexInstance: db });
let authCookie;
let testUser;
let statusId;
let taskId;

beforeAll(async () => {
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
  await db.destroy();
});

describe('Tasks CRUD', () => {
  test('Create a new task', async () => {
    const response = await supertest(app.server)
      .post('/tasks')
      .set('Cookie', authCookie)
      .type('form')
      .send({
        name: 'Task 1',
        description: 'Test task',
        statusId,
        executorId: testUser.id,
      });
    console.log('Create task response status:', response.status);
    console.log('Create task response headers:', response.headers);
    console.log('Create task response text:', response.text);
    expect(response.status).toBe(302);
    // Check that task exists in DB
    const task = await db('tasks').where({ name: 'Task 1' }).first();
    console.log('Created task from DB:', task);
    expect(task).toBeDefined();
    taskId = task?.id;
  });

  test('View task details', async () => {
    const response = await supertest(app.server)
      .get(`/tasks/${taskId}`)
      .set('Cookie', authCookie);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Task 1');
  });

  test('Edit a task', async () => {
    const response = await supertest(app.server)
      .patch(`/tasks/${taskId}`)
      .set('Cookie', authCookie)
      .type('form')
      .send({
        name: 'Task 1 Updated',
        description: 'Updated description',
        statusId,
        executorId: testUser.id,
      });
    expect(response.status).toBe(302);
    const updatedTask = await db('tasks').where({ id: taskId }).first();
    expect(updatedTask.name).toBe('Task 1 Updated');
  });

  test('Delete a task', async () => {
    const response = await supertest(app.server)
      .delete(`/tasks/${taskId}`)
      .set('Cookie', authCookie);
    expect(response.status).toBe(302);
    const deletedTask = await db('tasks').where({ id: taskId }).first();
    expect(deletedTask).toBeUndefined();
  });
});
