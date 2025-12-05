import knexModule from 'knex';
import bcrypt from 'bcrypt';
import * as knexConfig from '../knexfile.js';

const knex = knexModule(knexConfig.development);
const email = 'admin@example.com';
const password = 'admin123';
const role = 'admin';

async function updateAdminPassword() {
  const hash = await bcrypt.hash(password, 10);
  const updated = await knex('users')
    .where({ email })
    .update({ passwordDigest: hash, role });
  if (updated) {
    console.log(`Password for ${email} updated successfully.`);
  } else {
    console.log(`User ${email} not found.`);
  }
  process.exit(0);
}

updateAdminPassword();
