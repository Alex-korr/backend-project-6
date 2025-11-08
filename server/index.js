import Fastify from 'fastify';
import view from '@fastify/view';
import formbody from '@fastify/formbody';
import pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import indexRoutes from '../routes/index.js';

const app = Fastify({
  logger: true,
});

// Register plugins
app.register(view, {
  engine: {
    pug,
  },
  root: path.join(__dirname, '..', 'views'),
  defaultContext: {
    appName: 'Task Manager',
  },
});

app.register(formbody);

// Register routes
app.register(indexRoutes);

export default app;
