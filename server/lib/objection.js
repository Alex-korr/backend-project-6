import fp from 'fastify-plugin';
import objection from 'objection';
import Knex from 'knex';
// Use dynamic import for ESM compatibility
let knexConfig;
try {
  knexConfig = (await import('../knexfile.js')).default;
} catch (e) {
  knexConfig = {};
}

async function objectionPlugin(app, options) {
  const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
  objection.Model.knex(knex);
  app.decorate('objection', objection);
  app.decorate('knex', knex);
}

export default fp(objectionPlugin);
