import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export async function up(knex) {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  await knex('users').insert({
    first_name: 'Admin',
    last_name: 'User',
    email,
    password: hashedPassword,
    role: 'admin',
  });
}

export async function down(knex) {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  await knex('users').where({ email }).del();
}
