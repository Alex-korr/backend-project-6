// Statuses routes
import * as statusesController from '../server/controllers/statuses.js';
import ensureAuthenticated from '../server/middleware/ensureAuthenticated.js';

export default (app, options, done) => {
  app.get('/statuses', statusesController.index);
  app.get('/statuses/new', { preHandler: ensureAuthenticated }, statusesController.newStatus);
  app.post('/statuses', { preHandler: ensureAuthenticated }, statusesController.create);
  app.get('/statuses/:id/edit', { preHandler: ensureAuthenticated }, statusesController.edit);
  app.patch('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.update);
  app.delete('/statuses/:id', { preHandler: ensureAuthenticated }, statusesController.destroy);
  done();
};
