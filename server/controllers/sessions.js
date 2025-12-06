import fastifyPassport from '@fastify/passport';

export const newSession = async (request, reply) => {
  try {
    // Safely get query params
    const query = request.query ? { ...request.query } : {};
    
    // Determine current language
    const currentLang = request.cookies?.lang || query.lang || 'ru';
    
    // Safely get flash messages and translate if needed
    let error = [];
    let success = [];
    
    if (request.session && 
        request.session.flash && 
        Array.isArray(request.session.flash.error)) {
      error = request.session.flash.error.map(msg => {
        // If it's a translation key, translate it
        if (msg === 'flash.session.create.error') {
          return currentLang === 'ru' ? 'Неправильный email или пароль' : 'Invalid email or password';
        }
        return msg;
      });
    }
    
    if (request.session && 
        request.session.flash && 
        Array.isArray(request.session.flash.success)) {
      success = request.session.flash.success.map(msg => {
        // If it's a translation key, translate it
        if (msg === 'flash.session.create.success') {
          return currentLang === 'ru' ? 'Вы залогинены' : 'You are logged in';
        }
        if (msg === 'flash.session.delete.success') {
          return currentLang === 'ru' ? 'Вы разлогинены' : 'You are logged out';
        }
        return msg;
      });
    }
    
    // Clear flash messages after reading
    if (request.session && request.session.flash) {
      request.session.flash = {};
    }
    
    return reply.view('sessions/new', {
      error,
      success,
      layoutError: [],
      layoutSuccess: [],
      t: request.i18next.t.bind(request.i18next),
      currentLang,
      query,
      isAuthenticated: !!request.user,
      currentUser: request.user || null,
    });
  } catch (error) {
    console.error('Error in newSession controller:', error);
    // Render page with generic error
    return reply.view('sessions/new', {
      error: ['An error occurred. Please try again.'],
      success: [],
      layoutError: [],
      layoutSuccess: [],
      t: request.i18next.t.bind(request.i18next),
      currentLang: 'en',
      query: {},
      isAuthenticated: false,
      currentUser: null,
    });
  }
};

// This function is no longer used - login is handled directly in the route
// But we keep it for compatibility
export const create = async (request, reply) => {
  console.warn('DEPRECATED: sessionsController.create called - login is now handled in route handler');
  
  // If somehow this is called, redirect to home
  if (request.user) {
    return reply.redirect('/');
  } else {
    return reply.redirect('/session/new');
  }
};

export const destroy = async (request, reply) => {
  try {
    console.log('Logout attempt for user:', request.user?.id);
    
    // Set flash message BEFORE clearing session
    if (request.session) {
      request.session.flash = { session: { success: [request.i18next.t('flash.session.delete.success')] } };
    }
    
    // Log out the user (this clears user from session but keeps session alive)
    if (request.logout && typeof request.logout === 'function') {
      try {
        request.logout();
        console.log('request.logout called (sync)');
      } catch (err) {
        console.error('Logout error (sync):', err);
      }
    } else {
      console.log('No request.logout function available');
    }
    
    console.log('User logged out successfully');
    return reply.redirect('/');
  } catch (error) {
    console.error('Error in destroy session controller:', error);
    if (request.session) {
      request.session.flash = { 
        error: ['Error during logout. Please try again.'] 
      };
    }
    return reply.redirect('/');
  }
};

// Optional: Add a helper function for login if needed elsewhere
export const loginUser = async (request, reply, user) => {
  try {
    await request.logIn(user);
    request.session.flash = { success: ['Successfully logged in!'] };
    return true;
  } catch (error) {
    console.error('Login helper error:', error);
    request.session.flash = { error: ['Login failed'] };
    return false;
  }
};