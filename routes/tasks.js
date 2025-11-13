import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import tasksController from '../controllers/tasks.js';

module.exports = (app) => {
  app.get('/tasks', tasksController.index);
  app.get('/tasks/new', ensureAuthenticated, tasksController.new);
  app.post('/tasks', ensureAuthenticated, tasksController.create);
  app.get('/tasks/:id', tasksController.show);
  app.get('/tasks/:id/edit', ensureAuthenticated, tasksController.edit);
  app.patch('/tasks/:id', ensureAuthenticated, tasksController.update);
  app.delete('/tasks/:id', ensureAuthenticated, tasksController.remove);
};
export default (app) => {
  app.get('/tasks', tasksController.index);
  app.get('/tasks/new', ensureAuthenticated, tasksController.new);
  app.post('/tasks', ensureAuthenticated, tasksController.create);
  app.get('/tasks/:id', tasksController.show);
  app.get('/tasks/:id/edit', ensureAuthenticated, tasksController.edit);
  app.patch('/tasks/:id', ensureAuthenticated, tasksController.update);
  app.delete('/tasks/:id', ensureAuthenticated, tasksController.remove);
};
