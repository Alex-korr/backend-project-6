// useless test comment for git push
import dotenv from 'dotenv';
import Rollbar from 'rollbar';
console.log('Step 1: Loading .env');
dotenv.config();
console.log('Step 2: .env loaded, ROLLBAR_ACCESS_TOKEN:', process.env.ROLLBAR_ACCESS_TOKEN);
import Fastify from 'fastify'; // Fastify v4+
import view from '@fastify/view';
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import fastifySecureSession from '@fastify/secure-session';
import User from './models/User.js';
import statusesRoutes from './routes/statuses.js';

// Set up database
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
await db.migrate.latest();
Model.knex(db);

// Import routes
import indexRoutes from './routes/index.js';
import labelsRoutes from './routes/labels.js';
import tasksRoutes from './routes/tasks.js';

// Import locales
import en from './locales/en.js';
import ru from './locales/ru.js';



// Fastify CLI plugin export
export default async function (fastify, opts) {
  // Step 5: Initializing Rollbar
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  rollbar.log('Hello world from server startup!');
  fastify.decorate('rollbar', rollbar);

  // Add objection object for tests
  fastify.objection = { knex: db };

  // Configure i18next
  i18next
    .use(Backend)
    .init({
      resources: { en, ru },
      fallbackLng: 'en',
      lng: 'en',
      debug: false,
    });

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'code', 'public'),
    prefix: '/',
  });

  fastify.register(view, {
    engine: { pug },
    root: path.join(__dirname, 'views/views'),
    defaultContext: {
      appName: 'Task Manager',
      error: [],
      success: [],
    },
  });

  fastify.decorateRequest('i18next', null);
  fastify.addHook('preHandler', (req, reply, done) => {
    const lang = req.query.lang || req.cookies?.lang || req.session?.lang || 'en';
    req.i18next = i18next.cloneInstance({ lng: lang });
    done();
  });

  fastify.register(formbody);

  fastify.register(fastifySecureSession, {
    key: Buffer.from(process.env.SESSION_KEY, 'hex'),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
    },
  });

  fastifyPassport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.query().findOne({ email });
      if (!user) return done(null, false, { message: 'User not found' });
      const isValid = await user.verifyPassword(password);
      if (!isValid) return done(null, false, { message: 'Invalid password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user, req) => user.id);
  fastifyPassport.registerUserDeserializer(async (id, req) => await User.query().findById(id));

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  await fastify.register(indexRoutes);
  await fastify.register(labelsRoutes);
  await fastify.register(tasksRoutes);
  await fastify.register(statusesRoutes);
}
