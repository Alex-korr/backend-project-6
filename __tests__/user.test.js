import knex from 'knex';
import User from '../server/models/User.cjs';
import * as knexConfig from '../knexfile.js';
import createTestUser from '../__fixtures__/users.js';

const db = knex(knexConfig.test);
User.knex(db);

describe('User model', () => {
  beforeEach(async () => {
    await db.migrate.latest();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a user with valid data', async () => {
    const userData = {
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123',
    };
    const user = await User.query().insert(userData);
    expect(user.id).toBeDefined();
    expect(user.firstName).toBe(userData.firstName);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Should be hashed
  });

  it('should not create user with invalid email', async () => {
    const userData = {
      firstName: 'Jane', lastName: 'Doe', email: 'invalid-email', password: 'password123',
    };
    await expect(User.query().insert(userData)).rejects.toThrow();
  });

  it('should not create user with duplicate email', async () => {
    const email = 'duplicate@example.com';
    await createTestUser({ email });
    const userData2 = {
      firstName: 'Jane', lastName: 'Doe', email, password: 'password123',
    };
    await expect(User.query().insert(userData2)).rejects.toThrow();
  });

  it('should find user by email', async () => {
    const testUser = await createTestUser();
    const foundUser = await User.query().findOne({ email: testUser.email });
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(testUser.id);
  });

  it('should verify password correctly', async () => {
    const password = 'testpassword';
    const testUser = await createTestUser({ password });
    const isValid = await testUser.verifyPassword(password);
    expect(isValid).toBe(true);
    const isInvalid = await testUser.verifyPassword('wrongpassword');
    expect(isInvalid).toBe(false);
  });
});
