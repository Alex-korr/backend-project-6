import Fastify from 'fastify';
import app from './index.js';

const fastify = Fastify({
  logger: process.env.NODE_ENV !== 'production'
});

(async () => {
  try {
    await app(fastify, {});
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost'
    });
    // ...existing code...
  } catch (err) {
    // ...existing code...
    process.exit(1);
  }
})();
