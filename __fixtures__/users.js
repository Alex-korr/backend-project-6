import User from '../server/models/User.cjs';

export async function createTestUser(data = {}) {
  const defaultData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'password123',
  };
  return await User.query().insert({ ...defaultData, ...data });
}