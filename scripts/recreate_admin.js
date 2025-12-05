import * as knexConfig from '../knexfile.js';
import knexModule from 'knex';
import bcrypt from 'bcrypt';

const knex = knexModule(knexConfig.development);
const email = 'admin@example.com';
const password = 'admin123';
const role = 'admin';
async function recreateAdmin() {
  await knex('users').where({ email }).del();
  const hash = await bcrypt.hash(password, 10);
  await knex('users').insert({
    email,
    passwordDigest: hash,
    role,
    firstName: 'Admin',
    lastName: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log(`Admin user recreated with email: ${email} and password: ${password}`);
  process.exit(0);
}

recreateAdmin();
