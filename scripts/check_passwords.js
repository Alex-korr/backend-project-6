import knex from 'knex';
import bcrypt from 'bcrypt';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

async function checkPasswords() {
  const users = await db('users').select('id', 'email', 'password');
  users.forEach((user) => {
    const isHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
    // Можно добавить логику, если нужно что-то делать с isHash
  });
  process.exit(0);
}

checkPasswords();
