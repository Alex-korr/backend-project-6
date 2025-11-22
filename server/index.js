import dotenv from 'dotenv';
import Rollbar from 'rollbar';
console.log('Step 1: Loading .env');
dotenv.config();
console.log('Step 2: .env loaded, ROLLBAR_ACCESS_TOKEN:', process.env.ROLLBAR_ACCESS_TOKEN);
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
import tasksRoutes from '../routes/tasks.js';

// Import locales
import en from './locales/en.js';
import ru from './locales/ru.js';


console.log('Step 3: Creating Fastify app');
const app = Fastify({
  logger: true,
});
console.log('Step 4: Fastify app created');

console.log('Step 5: Initializing Rollbar');

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
});
console.log('Step 6: Rollbar initialized');
rollbar.log('Hello world from server startup!');
app.decorate('rollbar', rollbar);
console.log('Step 7: Rollbar decorated in Fastify app');

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
  // Get language from query, then cookie, then session, then default to 'en'
  const lang = req.query.lang || req.cookies?.lang || req.session?.lang || 'en';
  req.i18next = i18next.cloneInstance({ lng: lang });
  done();
});

app.register(formbody);

// Method override for PATCH/DELETE

// Secure session plugin (required for @fastify/passport)
console.log('Registering secure session...');
app.register(fastifySecureSession, {
  key: Buffer.from(process.env.SECURE_SESSION_KEY, 'hex'),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
  },
});
console.log('Secure session registered');

// Passport setup
fastifyPassport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    console.log('Passport local strategy called');
    console.log('Email:', email);
    const user = await User.query().findOne({ email });
    console.log('User from DB:', user);
    if (!user) {
      console.error('User not found for email:', email);
      return done(null, false, { message: 'User not found' });
    }
    const isValid = await user.verifyPassword(password);
    console.log('Password valid:', isValid);
    if (!isValid) {
      console.error('Invalid password for user:', email);
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  } catch (err) {
    console.error('Passport error:', err);
    return done(err);
  }
}));

fastifyPassport.registerUserSerializer(async (user, req) => {
  console.log('Serializer called for user:', user);
  return user.id;
});
fastifyPassport.registerUserDeserializer(async (id, req) => {
  console.log('Deserializer called for id:', id);
  return await User.query().findById(id);
});

app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

// Register routes
console.log('Step 8: Registering routes');
try {
  await app.register(indexRoutes);
  console.log('Step 8.1: indexRoutes registered');
} catch (err) {
  console.error('Error registering indexRoutes:', err);
}
try {
  await app.register(labelsRoutes);
  console.log('Step 8.2: labelsRoutes registered');
} catch (err) {
  console.error('Error registering labelsRoutes:', err);
}
try {
  await app.register(tasksRoutes);
  console.log('Step 8.3: tasksRoutes registered');
} catch (err) {
  console.error('Error registering tasksRoutes:', err);
}
try {
  await app.register(statusesRoutes);
  console.log('Step 8.4: statusesRoutes registered');
} catch (err) {
  console.error('Error registering statusesRoutes:', err);
}
console.log('Step 9: Routes registered');

console.log('Step 10: Exporting app');
export default app;
export const server = app.server || app;

// If this file is run directly, start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || '0.0.0.0';
  app.listen({ port: PORT, host: HOST })
    .then(() => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    })
    .catch((err) => {
      console.error('Server failed to start:', err);
      process.exit(1);
    });
}
