import knexConfig from '../knexfile.js';
import knex from 'knex';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const db = knex(knexConfig[process.env.NODE_ENV || 'development']);

async function addAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  await db('users').insert({
    firstName: 'Admin',
    lastName: 'User',
    email,
    password: hashedPassword,
    role: 'admin',
  });

  console.log('Admin user added');
  process.exit(0);
}

addAdmin();
