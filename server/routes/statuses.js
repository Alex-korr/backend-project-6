// Statuses routes
import * as statusesController from '../controllers/statuses.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

export default async (fastify) => {
  fastify.get('/statuses', statusesController.index);
  fastify.get('/statuses/new', { preHandler: ensureAuthenticated }, statusesController.newStatus);
  fastify.post('/statuses', { preHandler: ensureAuthenticated }, statusesController.create);
  fastify.get('/statuses/:id/edit', { preHandler: ensureAuthenticated }, statusesController.edit);
  fastify.patch('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.update);
  fastify.delete('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.remove);
  fastify.post('/statuses/:id/delete', { preHandler: ensureAuthenticated }, statusesController.remove);
};
