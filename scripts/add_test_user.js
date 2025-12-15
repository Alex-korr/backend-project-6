import knexModule from 'knex';
import bcrypt from 'bcrypt';
import { development } from '../knexfile.js';

const knex = knexModule(development);

async function addTestUser() {
  const email = 'lawrence.kulas87@outlook.com';
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Remove user if already exists
  await knex('users').where({ email }).del();

  // Insert test user
  await knex('users').insert({
    first_name: 'Lawrence',
    last_name: 'Kulas',
    email,
    password: hashedPassword,
    role: 'user',
    created_at: new Date(),
    updated_at: new Date(),
  });

  process.exit(0);
}

addTestUser().catch(() => {
  process.exit(1);
});
