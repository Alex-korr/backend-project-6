import * as usersController from '../server/controllers/users.js';
import * as sessionsController from '../server/controllers/sessions.js';
import * as tasksController from '../server/controllers/tasks.js';
import ensureAuthenticated from '../server/middleware/ensureAuthenticated.js';
import fastifyPassport from '@fastify/passport';

export default async (app, options) => {
  console.log('ROUTES INDEX.JS LOADED');
  // Home page
  app.get('/', (request, reply) => {
    let currentLang = request.cookies?.lang || request.query.lang || 'en';
    if (!request.cookies?.lang) {
      reply.setCookie('lang', 'en', { path: '/' });
      currentLang = 'en';
    }
    const error = request.session?.flash?.error || [];
    const success = request.session?.flash?.success || [];
    request.session.flash = {};
    reply.view('index', {
      t: request.i18next.t.bind(request.i18next),
      currentLang,
      error,
      success,
      isAuthenticated: !!request.user,
      currentUser: request.user || null,
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
  app.route({ method: 'GET', url: '/users', preHandler: [ensureAuthenticated], handler: usersController.index });
  app.get('/users/new', usersController.newUser);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  app.get('/users/:id/edit', usersController.edit);
  app.patch('/users/:id', usersController.update);
  app.post('/users/:id', usersController.destroy);

  // Sessions routes
  app.get('/session/new', sessionsController.newSession);
  app.route({
    method: 'POST',
    url: '/session',
    preHandler: fastifyPassport.authenticate('local', { failureRedirect: '/session/new' }),
    handler: sessionsController.create
  });
  app.post('/session/logout', sessionsController.destroy);



};
