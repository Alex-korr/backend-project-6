import knexConfig from '../knexfile.js';
import knex from 'knex';
import bcrypt from 'bcrypt';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

async function checkPasswords() {
  const users = await db('users').select('id', 'email', 'password');
  for (const user of users) {
    const isHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
    console.log(`User: ${user.email} | Hashed: ${isHash}`);
  }
  process.exit(0);
}

checkPasswords();
