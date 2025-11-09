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

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import indexRoutes from '../routes/index.js';

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
  },
});

// Add i18next to request with language detection
app.decorateRequest('i18next', null);
app.addHook('preHandler', (req, reply, done) => {
  // Get language from query parameter (?lang=ru) or default to 'en'
  const lang = req.query.lang || 'en';
  req.i18next = i18next.cloneInstance({ lng: lang });
  done();
});

app.register(formbody);

// Register routes
app.register(indexRoutes);

export default app;
