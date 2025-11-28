import fp from 'fastify-plugin';
import objection from 'objection';
import Knex from 'knex';
import knexConfig from '../knexfile.js';

async function objectionPlugin(app, options) {
  const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
  objection.Model.knex(knex);
  app.decorate('objection', objection);
  app.decorate('knex', knex);
}

export default fp(objectionPlugin);
