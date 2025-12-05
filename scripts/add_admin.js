import { development } from '../knexfile.js';
import knex from 'knex';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const db = knex(development);

async function addAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await db('users').where({ email }).first();
  if (existing) {
    await db('users').where({ email }).update({
      first_name: 'Admin',
      last_name: 'User',
      password_digest: hashedPassword,
      updated_at: new Date().toISOString(),
    });
    console.log('Admin user updated');
  } else {
    await db('users').insert({
      first_name: 'Admin',
      last_name: 'User',
      email,
      password_digest: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    console.log('Admin user added');
  }
  process.exit(0);
}

addAdmin();
