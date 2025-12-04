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
    console.log(`Server listening at ${fastify.server.address().port}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
