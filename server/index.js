import Fastify from 'fastify';
import view from '@fastify/view';
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import fastifySecureSession from '@fastify/secure-session';
import User from './models/User.js';
import statusesRoutes from '../routes/statuses.js';

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up database
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
await db.migrate.latest();
Model.knex(db);

// Import routes
import indexRoutes from '../routes/index.js';
import labelsRoutes from './routes/labels.js';

// Import locales
import en from './locales/en.js';
import ru from './locales/ru.js';

const app = Fastify({
  logger: true,
});

// Configure i18next
i18next
  .use(Backend)
  .init({
    resources: {
      en,
      ru,
    },
    fallbackLng: 'en',
    lng: 'en', // default language
    debug: false,
  });

// Register plugins
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/',
});

app.register(view, {
  engine: {
    pug,
  },
  root: path.join(__dirname, '..', 'views'),
  defaultContext: {
    appName: 'Task Manager',
    error: [], // Prevent undefined error in layout
    success: [],
  },
});

// Flash messages will be implemented manually using session

// Add i18next to request with language detection
app.decorateRequest('i18next', null);
app.addHook('preHandler', (req, reply, done) => {
  // Get language from query parameter (?lang=ru) or default to 'en'
  const lang = req.query.lang || 'en';
  req.i18next = i18next.cloneInstance({ lng: lang });
  done();
});

app.register(formbody);

// Method override for PATCH/DELETE

// Secure session plugin (required for @fastify/passport)
app.register(fastifySecureSession, {
  key: Buffer.from('a'.repeat(32)), // Replace with secure key from .env in production
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
  },
});

// Passport setup
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
fastifyPassport.registerUserDeserializer(async (id, req) => {
  return await User.query().findById(id);
});

app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

// Register routes
app.register(indexRoutes);
app.register(labelsRoutes);

export default app;
export const server = app.server || app;
