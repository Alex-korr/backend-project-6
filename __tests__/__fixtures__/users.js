import { faker } from '@faker-js/faker';
import User from '../../server/models/User.js';

// Fixture for creating test users
export const createTestUser = async (overrides = {}) => {
  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  };
  return await User.query().insert(userData);
};