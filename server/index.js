import dotenv from 'dotenv';
import Rollbar from 'rollbar';

// ...existing code...
dotenv.config();
// ...existing code...

import Fastify from 'fastify';
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

// Fastify CLI plugin export
export default async function (fastify, opts) {
  const mode = process.env.NODE_ENV || 'development';
  const models = [User, Label, Task, TaskStatus];
  
  // Initialize Rollbar for error tracking
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV || 'development',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  
  // ...existing code...
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
      // ...existing code...
      throw new Error('Invalid SECURE_SESSION_KEY format');
    }
  } else {
    // Generate a temporary key for development
    // ...existing code...
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
  // ...existing code...
  await fastify.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });

  // Configure Passport
  // ...existing code...

  // Configure user serialization/deserialization for sessions
  fastifyPassport.registerUserSerializer(async (user, req) => {
    // ...existing code...
    // ...existing code...
    if (!user) {
      // ...existing code...
      return null;
    }
    // ...existing code...
    // ...existing code...
    return user.id;
  });

  fastifyPassport.registerUserDeserializer(async (id, req) => {
    // ...existing code...
    // ...existing code...
    // ...existing code...
    try {
      const user = await User.query().findById(id);
      // ...existing code...
      return user;
    } catch (error) {
      // ...existing code...
      return null;
    }
  });

  // Initialize Passport
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  // Register LocalStrategy directly (not in onReady)
  fastifyPassport.use('local', new LocalStrategy({ 
    usernameField: 'email' 
  }, async (email, password, done) => {
    try {
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...
      
      // Use the directly imported User model
      // ...existing code...
      // ...existing code...
      // ...existing code...
      
      // Find user by email (case-insensitive)
      const user = await User.query().findOne({ 
        email: email.toLowerCase().trim() 
      });
      
      // ...existing code...
      // ...existing code...
      
      if (!user) {
        // ...existing code...
        // ...existing code...
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // ...existing code...
      // ...existing code...
      // ...existing code...
      
      // Debug user information
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...

      if (!user.password) {
        // ...existing code...
        return done(null, false, { message: 'Account error - no password set' });
      }
      
      // Verify password using user model method
      // ...existing code...
      const isValid = await user.verifyPassword(password);
      // ...existing code...
      
      if (!isValid) {
        // ...existing code...
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...
      
      return done(null, user);
    } catch (err) {
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...
      // ...existing code...
      return done(err);
    }
  }));
  // ...existing code...

  // Register application routes
  // ...existing code...
  await fastify.register(indexRoutes);
  
  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    // ...existing code...
    // ...existing code...
    // ...existing code...
    // ...existing code...
    // ...existing code...
    
    if (fastify.rollbar) {
      // ...existing code...
    }
    
    if (reply.sent) return;
    
    try {
      reply.status(error.statusCode || 500);
      
      return reply.view('error', {
        error: [error.message || 'Internal Server Error'],
        success: [],
        query: {},
        t: request.i18next ? request.i18next.t.bind(request.i18next) : (x => x),
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
        message: error.message 
      });
    }
  });
  
  // ...existing code...
  // ...existing code...
  // ...existing code...
  // ...existing code...
  
  return fastify;
}