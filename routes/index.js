import * as usersController from '../server/controllers/users.js';
import * as sessionsController from '../server/controllers/sessions.js';
import * as statusesController from '../server/controllers/statuses.js';
import * as tasksController from '../server/controllers/tasks.js';
import ensureAuthenticated from '../server/middleware/ensureAuthenticated.js';

export default async (app, options) => {
  console.log('ROUTES INDEX.JS LOADED');
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


  // Manual Rollbar error test route
  app.get('/rollbar-error', (req, reply) => {
    if (req.server && req.server.rollbar) {
      req.server.rollbar.error('Manual error test from /rollbar-error', (err) => {
        if (err) {
          console.error('Rollbar error send failed:', err);
        } else {
          console.log('Rollbar error sent successfully');
        }
      });
    }
    reply.send({ message: 'Error sent to Rollbar' });
  });


  // Manual Rollbar test route
  app.get('/rollbar-test', (req, reply) => {
    if (req.server && req.server.rollbar) {
      req.server.rollbar.log('Hello world from /rollbar-test!');
    }
    reply.send({ message: 'Message sent to Rollbar' });
  });


  // Test route for Rollbar error tracking
  app.get('/error', (req, reply) => {
    throw new Error('Test Rollbar error');
  });

  // Users routes
  app.get('/change-lang/:lang', usersController.changeLang);
  app.get('/users', usersController.index);
  app.get('/users/new', usersController.newUser);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  app.get('/users/:id/edit', usersController.edit);
  app.patch('/users/:id', usersController.update);
  app.post('/users/:id', usersController.destroy);

  // Sessions routes
  app.get('/session/new', sessionsController.newSession);
  app.post('/session', sessionsController.create);
  app.delete('/session', sessionsController.destroy);

  // Statuses routes
    app.route({ method: 'GET', url: '/statuses', preHandler: [ensureAuthenticated], handler: statusesController.index });
  app.route({ method: 'GET', url: '/statuses/new', preHandler: [ensureAuthenticated], handler: statusesController.newStatus });
    app.route({ method: 'POST', url: '/statuses', preHandler: [ensureAuthenticated], handler: statusesController.create });
    app.route({ method: 'GET', url: '/statuses/:id/edit', preHandler: [ensureAuthenticated], handler: statusesController.edit });
    app.route({ method: 'PATCH', url: '/statuses/:id', preHandler: [ensureAuthenticated], handler: statusesController.update });
    app.route({ method: 'DELETE', url: '/statuses/:id', preHandler: [ensureAuthenticated], handler: statusesController.remove });

  // Tasks routes
    app.route({ method: 'GET', url: '/tasks', handler: tasksController.index });
  app.route({ method: 'GET', url: '/tasks/new', preHandler: [ensureAuthenticated], handler: tasksController.newTask });
    app.route({ method: 'POST', url: '/tasks', preHandler: [ensureAuthenticated], handler: tasksController.create });
    app.route({ method: 'GET', url: '/tasks/:id', handler: tasksController.show });
    app.route({ method: 'GET', url: '/tasks/:id/edit', preHandler: [ensureAuthenticated], handler: tasksController.edit });
    app.route({ method: 'PATCH', url: '/tasks/:id', preHandler: [ensureAuthenticated], handler: tasksController.update });
    app.route({ method: 'DELETE', url: '/tasks/:id', preHandler: [ensureAuthenticated], handler: tasksController.remove });

};
