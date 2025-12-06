import * as usersController from '../controllers/users.js';
import * as sessionsController from '../controllers/sessions.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import fastifyPassport from '@fastify/passport';
import User from '../models/User.cjs';

export default async (app, options) => {
  // Language switch route
  app.get('/change-lang/:lang', (request, reply) => {
    const { lang } = request.params;
    const back = request.headers.referer || '/';
    if (['en', 'ru'].includes(lang)) {
      reply.setCookie('lang', lang, { path: '/' });
    }
    reply.redirect(back);
  });
  
  console.log('ROUTES INDEX.JS LOADED');
  
  // Home page
  app.get('/', (request, reply) => {
    let currentLang = request.cookies?.lang || 'ru';
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
      currentUrl: request.raw.url,
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

  // Users routes
  app.route({ 
    method: 'GET', 
    url: '/users', 
    preHandler: [ensureAuthenticated], 
    handler: usersController.index 
  });
  app.get('/users/new', usersController.newUser);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  app.get('/users/:id/edit', usersController.edit);
  app.patch('/users/:id', usersController.update);
  app.post('/users/:id', usersController.destroy);
  // Redirect /session to /session/new to avoid empty page
  app.get('/session', (request, reply) => {
    reply.redirect('/session/new');
  });
  // Sessions routes
  app.get('/session/new', sessionsController.newSession);

  // Debug session route for authentication troubleshooting
  app.get('/debug-session', async (request, reply) => {
    console.log('=== DEBUG SESSION ===');
    console.log('Request user:', request.user);
    console.log('Is authenticated:', request.isAuthenticated ? request.isAuthenticated() : 'no method');
    console.log('Session ID:', request.session?.sessionId);
    console.log('Session data:', request.session);
    return reply.send({
      user: request.user,
      isAuthenticated: request.isAuthenticated ? request.isAuthenticated() : false,
      sessionId: request.session?.sessionId,
      hasLogIn: typeof request.logIn === 'function',
      hasLogout: typeof request.logout === 'function'
    });
  });

  // POST /session - Login route
  app.post('/session', async (request, reply) => {
    const { email, password } = request.body;
    
    // Import User model directly
    const User = (await import('../models/User.cjs')).default;
    
    // Find user
    const user = await User.query().findOne({ email });
    
    if (!user) {
      request.session.flash = { error: ['Invalid email or password'] };
      console.log('[LOGIN] Failure - user not found, redirecting to /session/new');
      return reply.redirect('/session/new');
    }
    
    // Verify password
    const isValid = await user.verifyPassword(password);
    
    if (!isValid) {
      request.session.flash = { error: ['Invalid email or password'] };
      console.log('[LOGIN] Failure - invalid password, redirecting to /session/new');
      return reply.redirect('/session/new');
    }
    
    // Authentication successful
    await request.logIn(user);
    request.session.flash = { success: ['Successfully logged in!'] };
    console.log('[LOGIN] Success, user:', user?.email, 'redirecting to /');
    return reply.redirect('/');
  });

  // Logout route
  app.post('/session/logout', sessionsController.destroy);

  // Diagnostic route to check database
  app.get('/check-db', async (request, reply) => {
    try {
      console.log('=== CHECKING DATABASE ===');
      
      // 1. Check via User model
      const modelUsers = await User.query();
      console.log(`📊 Users via User model: ${modelUsers.length}`);
      
      modelUsers.forEach((user, index) => {
        console.log(`\nUser #${index + 1} (from model):`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Has password_digest: ${!!user.password_digest}`);
        console.log(`  password_digest length: ${user.password_digest?.length}`);
      });
      
      // 2. Check via direct database query
      try {
        // Dynamic import for ES modules
        const knexModule = await import('knex');
        const knexConfigModule = await import('../../knexfile.js');
        const Knex = knexModule.default;
        
        const mode = process.env.NODE_ENV || 'development';
        const knexConfig = knexConfigModule[mode] || knexConfigModule.default?.[mode] || knexConfigModule.default;
        const db = Knex(knexConfig);
        
        await db.raw('SELECT 1');
        console.log('✅ Database connection successful');
        
        const directUsers = await db('users').select('*');
        console.log(`📊 Direct DB query - users: ${directUsers.length}`);
        
        directUsers.forEach((user, index) => {
          console.log(`\nUser #${index + 1} (direct DB):`);
          console.log(`  ID: ${user.id}`);
          console.log(`  Email: ${user.email}`);
          
          // Find password fields
          const passwordFields = Object.keys(user).filter(key => 
            key.toLowerCase().includes('pass') || 
            key.toLowerCase().includes('digest') ||
            key.toLowerCase().includes('hash')
          );
          
          if (passwordFields.length > 0) {
            console.log('  Password fields found:');
            passwordFields.forEach(field => {
              console.log(`    - ${field}: ${user[field] ? `LENGTH=${user[field].length}` : 'NULL'}`);
            });
          } else {
            console.log('  No password fields found');
          }
        });
        
        await db.destroy();
        
        return reply.send({
          success: true,
          modelUsers: modelUsers.length,
          directUsers: directUsers.length,
          users: modelUsers.map(u => ({
            id: u.id,
            email: u.email,
            hasPasswordDigest: !!u.password_digest
          }))
        });
        
      } catch (dbError) {
        console.error('Direct DB check failed:', dbError.message);
        return reply.send({
          success: true,
          modelUsers: modelUsers.length,
          directUsers: 'DB connection failed',
          users: modelUsers.map(u => ({
            id: u.id,
            email: u.email,
            hasPasswordDigest: !!u.password_digest
          })),
          dbError: dbError.message
        });
      }
      
    } catch (error) {
      console.error('Database check error:', error);
      return reply.send({ 
        success: false, 
        error: error.message
      });
    }
  });

  // Route to create test user
  app.post('/create-test-user-now', async (request, reply) => {
    try {
      console.log('=== DEBUG /create-test-user-now ===');
      console.log('request.body:', request.body);
      console.log('typeof User:', typeof User);
      console.log('User:', User);
      console.log('User.query:', typeof User?.query);
      const { email = 'alex@mail.ru', password = 'admin123' } = request.body || {};
      
      console.log('=== CREATING TEST USER ===');
      console.log('Email:', email);
      console.log('Password:', password);
      
      // 1. Check if user exists
      const existingUser = await User?.query?.().findOne({ email });
      if (existingUser) {
        console.log('User already exists, updating password...');
        // Update password
        await existingUser.setPassword(password);
        await User.query().findById(existingUser.id).patch({
          password_digest: existingUser.password_digest,
          updated_at: new Date().toISOString()
        });
        const updatedUser = await User.query().findById(existingUser.id);
        return reply.send({
          success: true,
          action: 'updated',
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            passwordDigestLength: updatedUser.password_digest?.length,
            testPassword: password
          }
        });
      } else {
        // 2. Create new user
        console.log('Creating new user...');
        // Dynamic import for ES modules
        const bcryptModule = await import('bcrypt');
        const bcrypt = bcryptModule.default;
        const passwordDigest = await bcrypt.hash(password, 10);
        const newUser = await User.query().insert({
          email: email,
          first_name: 'Alex',
          last_name: 'Test',
          password_digest: passwordDigest,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        console.log('New user created:', newUser.id);
        return reply.send({
          success: true,
          action: 'created',
          user: {
            id: newUser.id,
            email: newUser.email,
            passwordDigestLength: newUser.password_digest?.length,
            testPassword: password
          }
        });
      }
      
    } catch (error) {
      console.error('Create user error:', error);
      return reply.send({ 
        error: error.message
      });
    }
  });

  // Simple test endpoint
  app.get('/test-auth', async (request, reply) => {
    return reply.send({
      authenticated: !!request.user,
      userId: request.user?.id,
      userEmail: request.user?.email,
      sessionId: request.session?.sessionId
    });
  });

  // Quick health check
  app.get('/health', async (request, reply) => {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      authenticated: !!request.user
    });
  });

  // Register additional routes for tasks, statuses, labels
  const tasksRoutes = (await import('./tasks.js')).default;
  const statusesRoutes = (await import('./statuses.js')).default;
  const labelsRoutes = (await import('./labels.js')).default;
  await tasksRoutes(app);
  await statusesRoutes(app);
  await labelsRoutes(app);
  
  console.log('Routes have been registered');
  return app;
};