// Entire file commented out. This file should be moved to routes/ if used for routing.
// import * as usersController from '../controllers/users.js';
// import * as sessionsController from '../controllers/sessions.js';
// import * as tasksController from '../controllers/tasks.js';
// import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
// import fastifyPassport from '@fastify/passport';

// export default async (app, options) => {
//   // Home page
//   app.get('/', (request, reply) => {
//     let currentLang = request.cookies?.lang || 'en';
//     const error = request.session?.flash?.error || [];
//     const success = request.session?.flash?.success || [];
//     request.session.flash = {};
//     reply.view('index', {
//       t: request.i18next.t.bind(request.i18next),
//       currentLang,
//       error,
//       success,
//       isAuthenticated: !!request.user,
//       currentUser: request.user || null,
//     });
//   });

//   // Manual Rollbar error test route
//   app.get('/rollbar-error', (req, reply) => {
//     if (req.server && req.server.rollbar) {
//       req.server.rollbar.error('Manual error test from /rollbar-error', (err) => {
//         if (err) {
//         } else {
//         }
//       });
//     }
//     reply.send({ message: 'Error sent to Rollbar' });
//   });

//   // Manual Rollbar test route
//   app.get('/rollbar-test', (req, reply) => {
//     if (req.server && req.server.rollbar) {
//       req.server.rollbar.log('Hello world from /rollbar-test!');
//     }
//     reply.send({ message: 'Message sent to Rollbar' });
//   });

//   // Test route for Rollbar error tracking

//   // Users routes
//   app.get('/change-lang/:lang', usersController.changeLang);
//   app.route({ method: 'GET', url: '/users', preHandler: [ensureAuthenticated], handler: usersController.index });
//   app.get('/users/new', usersController.newUser);
//   app.post('/users', usersController.create);
//   app.get('/users/:id', usersController.show);
//   app.get('/users/:id/edit', usersController.edit);
//   app.patch('/users/:id', usersController.update);
//   app.post('/users/:id', usersController.destroy);

//   // Sessions routes
//   app.get('/session/new', sessionsController.newSession);
//   app.route({
//     method: 'POST',
//     url: '/session',
//     preHandler: fastifyPassport.authenticate('local', { failureRedirect: '/session/new' }),
//     handler: sessionsController.create
//   });
//   app.post('/session/logout', sessionsController.destroy);

//   // Register additional routes for tasks, statuses, labels
//   const tasksRoutes = (await import('./tasks.js')).default;
//   const statusesRoutes = (await import('./statuses.js')).default;
//   const labelsRoutes = (await import('./labels.js')).default;
//   await tasksRoutes(app);
//   await statusesRoutes(app);
//   await labelsRoutes(app);
//   
//   return app;
// };
