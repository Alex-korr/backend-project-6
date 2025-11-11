import * as usersController from '../server/controllers/users.js';
import * as sessionsController from '../server/controllers/sessions.js';

export default (app, options, done) => {
  // Home page
  app.get('/', (request, reply) => {
    const currentLang = request.query.lang || 'en';
    // Read and clear flash messages from session
    const error = request.session?.flash?.error || [];
    const success = request.session?.flash?.success || [];
    request.session.flash = {};
    reply.view('index', {
      t: request.i18next.t.bind(request.i18next),
      currentLang,
      error,
      success,
    });
  });

  // Users routes
  app.get('/users', usersController.index);
  app.get('/users/new', usersController.newUser);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  app.get('/users/:id/edit', usersController.edit);
  app.patch('/users/:id', usersController.update);
  // Для удаления через форму (POST)
  app.post('/users/:id', usersController.destroy);

  // Sessions routes
  app.get('/session/new', sessionsController.newSession);
  app.post('/session', sessionsController.create);
  app.delete('/session', sessionsController.destroy);

  done();
};
