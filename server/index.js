import dotenv from 'dotenv';
import Rollbar from 'rollbar';
import path from 'path';
import view from '@fastify/view';
import fastifyStatic from '@fastify/static';
import formbody from '@fastify/formbody';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import pug from 'pug';
import { fileURLToPath } from 'url';
import fastifyObjectionjs from 'fastify-objectionjs';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import fastifySecureSession from '@fastify/secure-session';
import * as knexConfig from '../knexfile.js';

// Import models directly
import User from './models/User.cjs';
import Label from './models/Label.cjs';
import Task from './models/Task.cjs';
import TaskStatus from './models/TaskStatus.cjs';

// Import routes
import indexRoutes from './routes/index.js';

// Import locales
import en from './locales/en.js';
import ru from './locales/ru.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fastify CLI plugin export
export default async function main(fastify) {
  const mode = process.env.NODE_ENV || 'development';
  const models = [User, Label, Task, TaskStatus];

  // Initialize Rollbar for error tracking
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  fastify.decorate('rollbar', rollbar);

  // Serve static assets from server/public/
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  });

  // Configure i18next for internationalization
  i18next
    .use(Backend)
    .init({
      resources: { en, ru },
      fallbackLng: 'en',
      lng: 'en',
      debug: false,
    });

  // Register view engine (Pug)
  fastify.register(view, {
    engine: { pug },
    root: path.join(__dirname, 'views'),
    defaultContext: {
      appName: 'Task Manager',
      error: [],
      success: [],
      query: {},
    },
  });

  // Add i18next instance to each request
  fastify.decorateRequest('i18next', null);
  fastify.addHook('preHandler', (req, reply, done) => {
    let lang = req.cookies?.lang;
    if (!lang) {
      lang = 'ru';
      reply.setCookie('lang', lang, { path: '/' });
    }
    req.i18next = i18next.cloneInstance({ lng: lang });
    done();
  });

  // Register form body parser
  fastify.register(formbody);

  // Configure session security
  const sessionKey = process.env.SECURE_SESSION_KEY;

  if (!sessionKey && process.env.NODE_ENV === 'production') {
    throw new Error('SECURE_SESSION_KEY environment variable is required in production');
  }

  // Create session key buffer
  let sessionKeyBuffer;
  if (sessionKey) {
    try {
      sessionKeyBuffer = Buffer.from(sessionKey, 'hex');
    } catch (error) {
      throw new Error('Invalid SECURE_SESSION_KEY format');
    }
  } else {
    // Generate a temporary key for development
    sessionKeyBuffer = Buffer.alloc(32);
  }

  // Register secure session plugin
  fastify.register(fastifySecureSession, {
    key: sessionKeyBuffer,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
    },
  });

  // Register fastify-objectionjs for database models
  await fastify.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });

  // Configure Passport

  // Configure user serialization/deserialization for sessions
  fastifyPassport.registerUserSerializer(async (user) => {
    if (!user) {
      return null;
    }
    return user.id;
  });

  fastifyPassport.registerUserDeserializer(async (id) => {
    try {
      const user = await User.query().findById(id);
      return user;
    } catch (error) {
      return null;
    }
  });

  // Initialize Passport
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  // Register LocalStrategy directly (not in onReady)
  fastifyPassport.use('local', new LocalStrategy({
    usernameField: 'email',
  }, async (email, password, done) => {
    try {
      const user = await User.query().findOne({
        email: email.toLowerCase().trim(),
      });

      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      if (!user.password) {
        return done(null, false, { message: 'Account error - no password set' });
      }

      const isValid = await user.verifyPassword(password);

      if (!isValid) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Register application routes
  await fastify.register(indexRoutes);

  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    // Optionally, send error to Rollbar here
    // if (fastify.rollbar) fastify.rollbar.error(error);
    if (reply.sent) return undefined;
    try {
      reply.status(error.statusCode || 500);
      return reply.view('error', {
        error: [error.message || 'Internal Server Error'],
        success: [],
        query: {},
        t: request.i18next ? request.i18next.t.bind(request.i18next) : ((x) => x),
        currentLang: request.cookies?.lang || 'en',
        isAuthenticated: !!request.user,
        user: request.user,
        currentUrl: request.raw ? request.raw.url : '',
        appName: 'Task Manager',
      });
    } catch (e) {
      reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: error.message,
      });
    }
    return undefined;
  });
  return fastify;
}
