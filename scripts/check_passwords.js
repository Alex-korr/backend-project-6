import knex from 'knex';
import bcrypt from 'bcrypt';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

async function checkPasswords() {
  const users = await db('users').select('id', 'email', 'password');
  for (const user of users) {
    // eslint-disable-next-line no-unused-vars
    const isHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
  }
  process.exit(0);
}

checkPasswords();
