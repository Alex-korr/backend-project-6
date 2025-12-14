import Fastify from 'fastify';
import app from './index.js';

const fastify = Fastify({
  logger: false
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
