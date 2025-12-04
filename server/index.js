import dotenv from 'dotenv';
import Rollbar from 'rollbar';
console.log('Step 1: Loading .env');
dotenv.config();
console.log('Step 2: .env loaded, ROLLBAR_ACCESS_TOKEN:', process.env.ROLLBAR_ACCESS_TOKEN);
import Fastify from 'fastify'; // Fastify v4+
import view from '@fastify/view';
import fastifyStatic from '@fastify/static';
import formbody from '@fastify/formbody';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fastifyObjectionjs from 'fastify-objectionjs';
import * as knexConfig from '../knexfile.js';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import fastifySecureSession from '@fastify/secure-session';
import User from './models/User.cjs';
import Label from './models/Label.cjs';
import Task from './models/Task.cjs';
import TaskStatus from './models/TaskStatus.cjs';

// Import routes
import indexRoutes from './routes/index.js';
import labelsRoutes from './routes/labels.js';
import tasksRoutes from './routes/tasks.js';

// Import locales
import en from './locales/en.js';
import ru from './locales/ru.js';

// Fastify CLI plugin export
export default async function (fastify, opts) {
  const mode = process.env.NODE_ENV || 'development';
  const models = [User, Label, Task, TaskStatus];
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  rollbar.log('Hello world from server startup!');
  fastify.decorate('rollbar', rollbar);

  // Serve static assets from server/public/
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  });
  // Configure i18next
  i18next
    .use(Backend)
    .init({
      resources: { en, ru },
      fallbackLng: 'ru',
      lng: 'ru',
      debug: false,
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

  const sessionKey = process.env.SECURE_SESSION_KEY;
  
  if (!sessionKey && process.env.NODE_ENV === 'production') {
    throw new Error('SECURE_SESSION_KEY environment variable is required in production');
  }

  // Create session key - use environment variable or generate one for development
  let sessionKeyBuffer;
  if (sessionKey) {
    try {
      sessionKeyBuffer = Buffer.from(sessionKey, 'hex');
    } catch (error) {
      console.error('Invalid SECURE_SESSION_KEY format. Expected hex string.');
      throw new Error('Invalid SECURE_SESSION_KEY format');
    }
  } else {
    // Generate a temporary key for development
    console.warn('No SECURE_SESSION_KEY provided. Using temporary key for development only.');
    sessionKeyBuffer = Buffer.alloc(32);
  }

  fastify.register(fastifySecureSession, {
    key: sessionKeyBuffer,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
    },
  });

  // Register fastify-objectionjs
  await fastify.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });

  fastifyPassport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await fastify.objection.models.User.query().findOne({ email });
      if (!user) return done(null, false, { message: 'User not found' });
      const isValid = await user.verifyPassword(password);
      if (!isValid) return done(null, false, { message: 'Invalid password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user, req) => user.id);
  fastifyPassport.registerUserDeserializer(async (id, req) => await fastify.objection.models.User.query().findById(id));

  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  await fastify.register(indexRoutes);
  
  console.log('Default export function in Index.js', 'returned fastify instance:', fastify);
  return fastify;
}
