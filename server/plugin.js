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
import routes from '../routes/index.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import User from './models/User.js';
import pug from 'pug';
import dotenv from 'dotenv';
dotenv.config();

export default async function init(app) {
  const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
  Model.knex(db);
  app.objection = { knex: db, models: { user: User } };

  app.register(fastifyFormbody);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: 'supersecretkeysupersecretkey123456',
    cookie: { secure: false },
  });
  app.register(fastifyStatic, {
    root: path.resolve(process.cwd(), 'code/public'),
    prefix: '/public/',
  });
  app.register(fastifyView, {
    engine: { pug },
    root: path.resolve(process.cwd(), 'code/views'),
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
