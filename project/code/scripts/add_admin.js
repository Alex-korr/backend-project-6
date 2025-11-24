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

  const existing = await db('users').where({ email }).first();
  if (existing) {
    await db('users').where({ email }).update({
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: 'admin',
      updatedAt: new Date().toISOString(),
    });
    console.log('Admin user updated');
  } else {
    await db('users').insert({
      firstName: 'Admin',
      lastName: 'User',
      email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log('Admin user added');
  }
  process.exit(0);
}

addAdmin();
