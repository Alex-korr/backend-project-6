import * as usersController from '../controllers/users.js';
import * as sessionsController from '../controllers/sessions.js';

let User;

export default async (app) => {
  // Language switch route
  app.get('/change-lang/:lang', (request, reply) => {
    const { lang } = request.params;
    const back = request.headers.referer || '/';
    if (['en', 'ru'].includes(lang)) {
      reply.setCookie('lang', lang, { path: '/' });
    }
    reply.redirect(back);
  });

  // Home page
  app.get('/', (request, reply) => {
    const currentLang = request.cookies?.lang || 'ru';
    // Collect all flash messages from different sections
    const allErrors = [];
    const allSuccess = [];

    if (request.session?.flash) {
      // Helper function to translate flash keys
      const translateMsg = (msg) => {
        if (msg === 'flash.session.create.success') {
          return currentLang === 'ru' ? 'Вы залогинены' : 'You are logged in';
        }
        if (msg === 'flash.session.delete.success') {
          return currentLang === 'ru' ? 'Вы разлогинены' : 'You are logged out';
        }
        if (msg === 'flash.session.create.error') {
          return currentLang === 'ru' ? 'Неправильный email или пароль' : 'Invalid email or password';
        }
        return msg;
      };

      // Global messages
      if (request.session.flash.error) {
        allErrors.push(...request.session.flash.error.map(translateMsg));
      }
      if (request.session.flash.success) {
        allSuccess.push(...request.session.flash.success.map(translateMsg));
      }

      // Session messages
      if (request.session.flash.session?.error) {
        allErrors.push(...request.session.flash.session.error.map(translateMsg));
      }
      if (request.session.flash.session?.success) {
        allSuccess.push(...request.session.flash.session.success.map(translateMsg));
      }

      // eslint-disable-next-line no-param-reassign
      request.session.flash = {};
    }

    reply.view('index', {
      t: request.i18next.t.bind(request.i18next),
      currentLang,
      layoutError: allErrors,
      layoutSuccess: allSuccess,
      isAuthenticated: !!request.user,
      currentUser: request.user || null,
      currentUrl: request.raw.url,
    });
  });

  // Manual Rollbar error test route
  app.get('/rollbar-error', (req, reply) => {
    if (req.server && req.server.rollbar) {
      req.server.rollbar.error('Manual error test from /rollbar-error', (err) => {
        if (err) {
          // console.error('Rollbar error send failed:', err);
        } else {
          // console.log('Rollbar error sent successfully');
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

  // Users routes
  const usersRoutes = (await import('./users.js')).default;
  usersRoutes(app);

  // Sessions routes - both URLs show login form directly (no redirects)
  app.get('/session', sessionsController.newSession);
  app.get('/session/new', sessionsController.newSession);

  // Debug session route for authentication troubleshooting
  app.get('/debug-session', async (request, reply) => reply.send({
    user: request.user,
    isAuthenticated: request.isAuthenticated ? request.isAuthenticated() : false,
    sessionId: request.session?.sessionId,
    hasLogIn: typeof request.logIn === 'function',
    hasLogout: typeof request.logout === 'function',
  }));

  // POST /session - Login route
  app.post('/session', async (request, reply) => {
    const { email, password } = request.body;
    const currentLang = request.cookies?.lang || 'ru';
    const translateError = () => (currentLang === 'ru' ? 'Неправильный email или пароль' : 'Invalid email or password');
    // Server-side validation - render form directly (NO redirect)
    if (!email || !email.trim() || !password || !password.trim()) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session',
      });
    }
    // Import User model directly
    const UserSession = (await import('../models/User.cjs')).default;
    // Find user
    const user = await UserSession.query().findOne({ email });
    if (!user) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session',
      });
    }
    // Verify password
    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session',
      });
    }
    // Authentication successful
    await request.logIn(user);
    // eslint-disable-next-line no-param-reassign
    request.session.flash = { session: { success: [request.i18next.t('flash.session.create.success')] } };
    return reply.redirect('/');
  });

  // POST /session/new - Login from /session/new page (no redirect, render directly)
  app.post('/session/new', async (request, reply) => {
    const { email, password } = request.body;
    const currentLang = request.cookies?.lang || 'ru';
    const translateError = () => (currentLang === 'ru' ? 'Неправильный email или пароль' : 'Invalid email or password');
    // Server-side validation - render form with error (NO redirect)
    if (!email || !email.trim() || !password || !password.trim()) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session/new',
      });
    }
    // Import User model
    const UserSession = (await import('../models/User.cjs')).default;
    const user = await UserSession.query().findOne({ email });
    if (!user) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session/new',
      });
    }
    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return reply.view('sessions/new', {
        error: [translateError()],
        success: [],
        layoutError: [],
        layoutSuccess: [],
        t: request.i18next.t.bind(request.i18next),
        currentLang,
        isAuthenticated: false,
        currentUser: null,
        currentUrl: '/session/new',
      });
    }
    // Success - redirect to home
    await request.logIn(user);
    // eslint-disable-next-line no-param-reassign
    request.session.flash = { session: { success: [request.i18next.t('flash.session.create.success')] } };
    return reply.redirect('/');
  });

  // Logout route
  app.post('/session/logout', sessionsController.destroy);

  // Diagnostic route to check database
  app.get('/check-db', async (request, reply) => {
    try {
      if (!User) {
        User = (await import('../models/User.cjs')).default;
      }
      // 1. Check via User model
      const modelUsers = await User.query();
      // 2. Check via direct database query
      try {
        // Dynamic import for ES modules
        const knexModule = await import('knex');
        const knexConfigModule = await import('../../knexfile.js');
        const Knex = knexModule.default;
        const mode = process.env.NODE_ENV || 'development';
        // eslint-disable-next-line max-len
        const knexConfig = knexConfigModule[mode]
          || knexConfigModule.default?.[mode]
          || knexConfigModule.default;
        // eslint-disable-next-line new-cap
        const db = new Knex(knexConfig);
        await db.raw('SELECT 1');
        const directUsers = await db('users').select('*');
        await db.destroy();
        return reply.send({
          success: true,
          modelUsers: modelUsers.length,
          directUsers: directUsers.length,
          users: modelUsers.map((u) => ({
            id: u.id,
            email: u.email,
            hasPasswordDigest: !!u.password_digest,
          })),
        });
      } catch (dbError) {
        return reply.send({
          success: true,
          modelUsers: modelUsers.length,
          directUsers: 'DB connection failed',
          users: modelUsers.map((u) => ({
            id: u.id,
            email: u.email,
            hasPasswordDigest: !!u.password_digest,
          })),
          dbError: dbError.message,
        });
      }
    } catch (error) {
      return reply.send({
        success: false,
        error: error.message,
      });
    }
  });

  // Route to create test user
  app.post('/create-test-user-now', async (request, reply) => {
    try {
      const { email = 'alex@mail.ru', password = 'admin123' } = request.body || {};

      // 1. Check if user exists
      const existingUser = await User?.query?.().findOne({ email });
      if (existingUser) {
        // Update password
        await existingUser.setPassword(password);
        await User.query().findById(existingUser.id).patch({
          password_digest: existingUser.password_digest,
          updated_at: new Date().toISOString(),
        });
        const updatedUser = await User.query().findById(existingUser.id);
        return reply.send({
          success: true,
          action: 'updated',
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            passwordDigestLength: updatedUser.password_digest?.length,
            testPassword: password,
          },
        });
      }
      // 2. Create new user
      // Dynamic import for ES modules
      const bcryptModule = await import('bcrypt');
      const bcrypt = bcryptModule.default;
      const passwordDigest = await bcrypt.hash(password, 10);
      const newUser = await User.query().insert({
        email,
        first_name: 'Alex',
        last_name: 'Test',
        password_digest: passwordDigest,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return reply.send({
        success: true,
        action: 'created',
        user: {
          id: newUser.id,
          email: newUser.email,
          passwordDigestLength: newUser.password_digest?.length,
          testPassword: password,
        },
      });
    } catch (error) {
      return reply.send({
        error: error.message,
      });
    }
  });

  // Simple test endpoint
  app.get('/test-auth', async (request, reply) => reply.send({
    authenticated: !!request.user,
    userId: request.user?.id,
    userEmail: request.user?.email,
    sessionId: request.session?.sessionId,
  }));

  // Quick health check
  app.get('/health', async (request, reply) => reply.send({
    status: 'ok',
    timestamp: new Date().toISOString(),
    authenticated: !!request.user,
  }));

  // Register additional routes for tasks, statuses, labels
  const tasksRoutes = (await import('./tasks.js')).default;
  const statusesRoutes = (await import('./statuses.js')).default;
  const labelsRoutes = (await import('./labels.js')).default;
  await tasksRoutes(app);
  await statusesRoutes(app);
  await labelsRoutes(app);

  return app;
};
