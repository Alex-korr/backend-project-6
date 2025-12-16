import fastify from 'fastify';
import appInit from './index.js';

const app = fastify({
  logger: false,
});

(async () => {
  try {
    await appInit(app, {});
    await app.listen({
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
    });
  } catch (err) {
    process.exit(1);
  }
})();
