// @ts-check
import { fileURLToPath } from 'url';
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import fastifyFormbody from '@fastify/formbody';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import { Model } from 'objection';
import routes from './routes/index.js';
import knex from 'knex';
// @ts-ignore
import * as knexConfig from '../knexfile.js';
import User from './models/User.cjs';
import pug from 'pug';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @typedef {typeof import('./models/User.cjs')} UserClass
 * @typedef {import('knex').Knex} KnexInstance
 * @typedef {import('fastify').FastifyInstance & { objection: { knex: KnexInstance, models: { user: UserClass } } }} AppWithObjection
 */

/**
 * @param {AppWithObjection} app
 */
export default async function init(app) {
  const env = /** @type {keyof typeof knexConfig} */ (process.env.NODE_ENV || 'test');
  let dbConfig = knexConfig[env];
  if (!dbConfig) {
    console.warn(`Knex config for env "${env}" not found, using "test"`);
    dbConfig = knexConfig.test;
  }
  const db = knex(dbConfig);
  Model.knex(db);
  app.objection = { knex: db, models: { user: User } };

  app.register(fastifyFormbody);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: 'supersecretkeysupersecretkey123456',
    cookie: { secure: false },
  });
  app.register(fastifyStatic, {
    root: path.resolve(process.cwd(), 'public'),
    prefix: '/public/',
  });
  app.register(fastifyView, {
    engine: { pug },
    root: path.resolve(process.cwd(), 'views'),
    defaultContext: {
      appName: 'Task Manager',
      error: [],
      success: [],
    },
  });

  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());

  app.register(routes);

  // Fallback error handler for all requests
  app.setErrorHandler((error, request, reply) => {
    console.error('GLOBAL ERROR:', error);
    reply.type('text/html').code(500).send('<h1>Internal Server Error</h1><pre>' + error.stack + '</pre>');
  });

  // Fallback not found handler for all requests
  app.setNotFoundHandler((request, reply) => {
    reply.type('text/html').code(404).send('<h1>404 Not Found</h1>');
  });

  return app;
}
