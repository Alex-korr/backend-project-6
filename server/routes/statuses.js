// Statuses routes
import * as statusesController from '../controllers/statuses.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

export default async (app) => {
  app.get('/statuses', statusesController.index);
  app.get('/statuses/new', { preHandler: ensureAuthenticated }, statusesController.newStatus);
  app.post('/statuses', statusesController.create);
  app.get('/statuses/:id/edit', { preHandler: ensureAuthenticated }, statusesController.edit);
  app.patch('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.update);
  app.delete('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.remove);
  app.post('/statuses/:id/delete', { preHandler: ensureAuthenticated }, statusesController.remove);
};
