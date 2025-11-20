import { index, newLabel, create, edit, update, remove } from '../controllers/labels.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

export default async (app) => {
  app.route({ method: 'GET', url: '/labels', preHandler: [ensureAuthenticated], handler: index });
  app.route({ method: 'GET', url: '/labels/new', preHandler: [ensureAuthenticated], handler: newLabel });
  app.route({ method: 'POST', url: '/labels', preHandler: [ensureAuthenticated], handler: create });
  app.route({ method: 'GET', url: '/labels/:id/edit', handler: edit });
  app.route({ method: 'PATCH', url: '/labels/:id', handler: update });
  app.route({ method: 'DELETE', url: '/labels/:id', handler: remove });
};
