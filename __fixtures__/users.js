import User from '../server/models/User.cjs';
import bcrypt from 'bcrypt';

export async function createTestUser(data = {}) {
  const defaultData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: await bcrypt.hash('password123', 10),
  };
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.query().insert({ ...defaultData, ...data });
}