import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export async function up(knex) {
  dotenv.config();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await knex('users').where({ email }).first();
  if (!existing) {
    await knex('users').insert({
      email,
      first_name: 'Admin',
      last_name: 'User',
      password: passwordHash,
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}

export async function down(knex) {
  dotenv.config();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  await knex('users').where({ email }).del();
}
