import view from '@fastify/view';
import objectionPlugin from './lib/objection.js';
import pug from 'pug';
import Fastify from 'fastify'; // Fastify v4+
import fastifyFormbody from '@fastify/formbody';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { Model } from 'objection';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js';

import dotenv from 'dotenv';
import Rollbar from 'rollbar';
dotenv.config();

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export function buildApp({ knexInstance } = {}) {
  // Always use passed knexInstance for Jest/ESM compatibility
  if (!knexInstance) {
    throw new Error('buildApp must be called with knexInstance in Jest/ESM environment');
  }
  const db = knexInstance;
  Model.knex(db);
  const app = Fastify({ logger: false });

  // Register plugins
  app.register(fastifyFormbody);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: 'supersecretkeysupersecretkey123456',
    cookie: { secure: false },
  });
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  });
  app.register(view, {
    engine: { pug },
    root: path.join(__dirname, '../views'),
    defaultContext: {
      appName: 'Task Manager',
      error: [],
      success: [],
    },
  });

  // Register objection plugin (Fastify/Objection integration)
  app.register(objectionPlugin, {
    knexConfig: knexConfig[process.env.NODE_ENV || 'development'],
    models: [User], // Add other models as needed
  });

  // Passport setup
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());

  fastifyPassport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.query().findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      const valid = await user.verifyPassword(password);
      if (!valid) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user, req) => user.id);
  fastifyPassport.registerUserDeserializer(async (id, req) => {
    return await User.query().findById(id);
  });

  app.register(routes);

  // Global error handler for all requests
  app.setErrorHandler((error, request, reply) => {
    rollbar.error(error, request);
    console.error('GLOBAL ERROR:', error);
    reply.type('text/html').code(500).send('<h1>Internal Server Error</h1><pre>' + error.stack + '</pre>');
  });

  // Global not found handler for all requests
  app.setNotFoundHandler((request, reply) => {
    reply.type('text/html').code(404).send('<h1>404 Not Found</h1>');
  });

  return app;
}

// Export init function for Hexlet test compatibility
export async function init() {
  const app = buildApp();
  // Do not register objectionPlugin so app.objection.knex is available as expected by tests
  return app;
}

