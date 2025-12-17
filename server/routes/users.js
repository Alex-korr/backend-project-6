import * as usersController from '../controllers/users.js';

export default (app) => {
  app.get('/users', usersController.index); // Public route - no auth required
  app.get('/users/new', usersController.newUser);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  app.get('/users/:id/edit', usersController.edit);
  app.post('/users/:id/update', usersController.update);
  app.patch('/users/:id', usersController.update);
  app.post('/users/:id/delete', usersController.destroy);
  app.delete('/users/:id', usersController.destroy);
};
