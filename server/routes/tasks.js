import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import * as tasksController from '../controllers/tasks.js';

export default async (app) => {
  app.get('/tasks', tasksController.index);
  app.get('/tasks/new', { preHandler: ensureAuthenticated }, tasksController.newTask);
  app.post('/tasks', { preHandler: ensureAuthenticated }, tasksController.create);
  app.get('/tasks/:id', tasksController.show);
  app.get('/tasks/:id/edit', tasksController.edit);
  app.patch('/tasks/:id', { preHandler: ensureAuthenticated }, tasksController.update);
  app.delete('/tasks/:id', { preHandler: ensureAuthenticated }, tasksController.remove);
  app.post('/tasks/:id/delete', { preHandler: ensureAuthenticated }, tasksController.remove);
};
