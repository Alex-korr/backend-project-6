
import knexModule from 'knex';
import { development } from '../knexfile.js';
const knex = knexModule(development);
import bcrypt from 'bcrypt';


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
  console.log(`Test user ${email} added with password '${password}'`);
  process.exit(0);
}

addTestUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
