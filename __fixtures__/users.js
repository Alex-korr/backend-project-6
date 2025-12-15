import bcrypt from 'bcrypt';
import User from '../server/models/User.cjs';

const createTestUser = async (inputData = {}) => {
  const defaultData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: await bcrypt.hash('password123', 10),
  };
  const data = { ...inputData };
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.query().insert({ ...defaultData, ...data });
};

export default createTestUser;
