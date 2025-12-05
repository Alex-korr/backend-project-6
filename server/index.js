import dotenv from 'dotenv';
import Rollbar from 'rollbar';

console.log('Step 1: Loading .env');
dotenv.config();
console.log('Step 2: .env loaded, ROLLBAR_ACCESS_TOKEN:', process.env.ROLLBAR_ACCESS_TOKEN);

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
  
  rollbar.log('Hello world from server startup!');
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
    root: path.join(__dirname, 'views/views'),
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
      console.error('Invalid SECURE_SESSION_KEY format. Expected hex string.');
      throw new Error('Invalid SECURE_SESSION_KEY format');
    }
  } else {
    // Generate a temporary key for development
    console.warn('No SECURE_SESSION_KEY provided. Using temporary key for development only.');
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
  console.log('=== REGISTERING DATABASE MODELS ===');
  await fastify.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });

  // Configure Passport
  console.log('=== CONFIGURING PASSPORT ===');

  // Configure user serialization/deserialization for sessions
  fastifyPassport.registerUserSerializer(async (user, req) => {
    console.log('=== [SERIALIZER] ===');
    console.log('Serializer called!');
    if (!user) {
      console.log('Serializer: user is null or undefined!');
      return null;
    }
    console.log('Serializer: user object:', user);
    console.log('Serializer: user.id =', user.id);
    return user.id;
  });

  fastifyPassport.registerUserDeserializer(async (id, req) => {
    console.log('=== [DESERIALIZER] ===');
    console.log('Deserializer called!');
    console.log('Deserializer: id =', id);
    try {
      const user = await User.query().findById(id);
      console.log('Deserializer: loaded user:', user);
      return user;
    } catch (error) {
      console.error('Deserialization error:', error);
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
      console.log('\n' + '='.repeat(50));
      console.log('=== PASSPORT LOCAL STRATEGY START ===');
      console.log(`Email: ${email}`);
      console.log(`Password length: ${password?.length}`);
      console.log('='.repeat(50) + '\n');
      
      // Use the directly imported User model
      console.log('=== USING DIRECT USER MODEL IMPORT ===');
      console.log('User model available:', !!User);
      console.log('User.query available:', !!User.query);
      
      // Find user by email (case-insensitive)
      const user = await User.query().findOne({ 
        email: email.toLowerCase().trim() 
      });
      
      console.log('=== USER QUERY RESULT ===');
      console.log('User found:', !!user);
      
      if (!user) {
        console.log('❌ User not found in database');
        console.log('Searched for email:', email);
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      console.log('✅ User found in database');
      console.log('User ID:', user.id);
      console.log('User email from DB:', user.email);
      
      // Debug user information
      console.log('=== USER DEBUG INFO ===');
      console.log('Has passwordDigest:', !!user.passwordDigest);
      console.log('passwordDigest length:', user.passwordDigest?.length);
      console.log('passwordDigest preview:', user.passwordDigest?.substring(0, 20) + '...');

      if (!user.passwordDigest) {
        console.error('❌ CRITICAL: User has no passwordDigest field!');
        return done(null, false, { message: 'Account error - no password set' });
      }
      
      // Verify password using user model method
      console.log('\n=== CALLING verifyPassword ===');
      const isValid = await user.verifyPassword(password);
      console.log('verifyPassword returned:', isValid);
      
      if (!isValid) {
        console.log('❌ Password verification failed');
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      console.log('\n' + '='.repeat(50));
      console.log('✅ ✅ ✅ AUTHENTICATION SUCCESSFUL ✅ ✅ ✅');
      console.log(`User ${user.email} (ID: ${user.id}) logged in`);
      console.log('='.repeat(50) + '\n');
      
      return done(null, user);
    } catch (err) {
      console.error('\n' + '='.repeat(50));
      console.error('❌ ❌ ❌ LOCAL STRATEGY ERROR ❌ ❌ ❌');
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      console.error('='.repeat(50) + '\n');
      return done(err);
    }
  }));
  console.log('✅ LocalStrategy configured successfully');

  // Register application routes
  console.log('=== REGISTERING ROUTES ===');
  await fastify.register(indexRoutes);
  
  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    if (fastify.rollbar) {
      fastify.rollbar.error(error, request);
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
  
  console.log('=== SERVER INITIALIZATION COMPLETE ===');
  console.log('Environment:', mode);
  console.log('Session security:', sessionKey ? 'Using env key' : 'Using temporary key');
  console.log('Models registered:', models.map(m => m.name).join(', '));
  
  return fastify;
}