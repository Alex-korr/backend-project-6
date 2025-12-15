import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

async function checkPasswords() {
  const users = await db('users').select('id', 'email', 'password');
  users.forEach((user) => {
    // Здесь можно добавить проверку пароля, если потребуется
  });
  process.exit(0);
}

checkPasswords();
