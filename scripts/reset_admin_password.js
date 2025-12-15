import knexModule from 'knex';
import bcrypt from 'bcrypt';
import * as knexConfig from '../knexfile.js';

const knex = knexModule(knexConfig.development);
const email = 'admin@example.com';
const password = 'admin123';
const role = 'admin';

async function updateAdminPassword() {
  const hash = await bcrypt.hash(password, 10);
  await knex('users')
    .where({ email })
    .update({ passwordDigest: hash, role });
  // Можно добавить вывод результата, если нужно
  process.exit(0);
}

updateAdminPassword();
