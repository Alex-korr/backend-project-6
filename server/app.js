import view from '@fastify/view';
import objectionPlugin from './lib/objection.js';
import pug from 'pug';
import Fastify from 'fastify'; // Fastify v4+
import fastifyFormbody from '@fastify/formbody';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { Model } from 'objection';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.cjs';

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




export async function buildApp() {
  const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
  Model.knex(db);
  const app = Fastify({ logger: false });
  app.objection = { knex: db };

  app.register(fastifyFormbody);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: 'supersecretkeysupersecretkey123456',
    cookie: { secure: false },
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

  app.setErrorHandler((error, request, reply) => {
    rollbar.error(error, request);
    console.error('GLOBAL ERROR:', error);
    reply.type('text/html').code(500).send('<h1>Internal Server Error</h1><pre>' + error.stack + '</pre>');
  });

  app.setNotFoundHandler((request, reply) => {
    reply.type('text/html').code(404).send('<h1>404 Not Found</h1>');
  });

  return app;

}

console.log('App.js loaded');
// Export init function for Hexlet test compatibility
export default async function init(arg1, arg2) {
console.log('Init function called in app.js');
console.log('arg1:', arg1); 
console.log('arg2:', arg2);
  const app = buildApp();
  // Do not register objectionPlugin so app.objection.knex is available as expected by tests
  return app;
}